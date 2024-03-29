ARG PROFILE=production
#
# target:android
FROM ubuntu:latest AS android
ARG PROFILE
ARG SDK_FILE=commandlinetools-linux-7583922_latest.zip
COPY / /src
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV NODE_ENV=$PROFILE
RUN \
#
# packages
apt-get --yes update && \
apt-get --yes install --no-install-recommends ${PKG_DEV:= \
  gradle \
  inotify-tools \
  openjdk-8-jdk-headless \
} && \
apt-get --yes install --no-install-recommends ${PKG_TMP:= \
  gnupg \
  wget \
} && \
#
# buildenv
. /etc/lsb-release && \
#
# nodejs
wget --output-document=- https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
  | apt-key add - && \
echo "deb https://deb.nodesource.com/node_12.x $DISTRIB_CODENAME main" \
  >/etc/apt/sources.list.d/nodejs.list && \
apt-get --yes update && \
apt-get --yes install --no-install-recommends \
  nodejs && \
#
# npm@6 (https://github.com/apache/cordova-lib/issues/859)
npm install --global npm@6 && \
export PATH=$PATH && \
#
# android-sdk
cd $(mktemp --directory) && \
wget https://dl.google.com/android/repository/$SDK_FILE && \
mkdir --parent $ANDROID_SDK_ROOT && \
unzip -d $ANDROID_SDK_ROOT $SDK_FILE && \
yes | $ANDROID_SDK_ROOT/cmdline-tools/bin/sdkmanager \
  --sdk_root=$ANDROID_SDK_ROOT \
  --licenses >/dev/null && \
$ANDROID_SDK_ROOT/cmdline-tools/bin/sdkmanager \
  --sdk_root=$ANDROID_SDK_ROOT \
  'build-tools;30.0.3' && \
#
# wooportal
test "$PROFILE" = 'production' && ( \
  npm --prefix /src install --also=development && \
  npm --prefix /src run build @wooportal/client:browser:production && \
  npm --prefix /src run cordova platform add android@10.1.1 && \
  npm --prefix /src run cordova build android -- --release && \
  mv $(find /src -name app-release.apk) /client.apk && \
  find $ANDROID_SDK_ROOT /root /src -delete -mindepth 1 && \
  apt-get --yes purge --autoremove $PKG_DEV \
) || ( \
  mkdir /src/www && \
  npm --prefix /src install cordova && \
  npm --prefix /src run cordova platform add android@10.1.1 && \
  npm --prefix /src run cordova compile android \
) && \
#
# cleanup
apt-get --yes clean all && \
apt-get --yes purge --autoremove $PKG_TMP && \
find /tmp /var/lib/apt/lists -delete -mindepth 1
#
# target
FROM alpine:latest
ARG PROFILE
COPY / /src
COPY --from=android /client.apk /client.apk
ENV NODE_ENV=$PROFILE
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN \
#
# packages
apk --no-cache add \
  nodejs && \
apk --no-cache --virtual build add \
  npm && \
#
# npm@6 (https://github.com/apache/cordova-lib/issues/859)
npm install --global npm@6 && \
export PATH=$PATH && \
#
# wooportal
npm --prefix /src install --also=development && \
npm --prefix /src run build @wooportal/client:browser:production && \
npm --prefix /src run cordova platform add browser@6.0.0 && \
npm --prefix /src run cordova build browser -- --release && \
npm --prefix /src run build @wooportal/client:server:production && \
npm --prefix /src run ngsw platforms/browser/www ngsw-config.json && \
npm --prefix /src clean-install --no-optional --only=production && \
mv /client.apk /src/platforms/browser/www && \
#
# cleanup
apk del --purge build && \
find /root /tmp -delete -mindepth 1
#
# runtime
EXPOSE 4000
WORKDIR /src
HEALTHCHECK CMD wget -q --spider 127.0.0.1:4000/imprint
CMD node platforms/server/main
