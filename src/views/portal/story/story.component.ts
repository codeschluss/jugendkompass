import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BlogpostModel, CrudJoiner, CrudResolver, MetatagService, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['story.component.sass'],
  templateUrl: 'story.component.html'
})

export class StoryComponent
  extends RoutingComponent
  implements OnInit {

  public get item(): BlogpostModel {
    return this.route.snapshot.data.item;
  }

  protected get routing(): Route {
    return {
      path: 'story/:uuid',
      resolve: {
        item: CrudResolver
      },
      data: {
        resolve: {
          item: CrudJoiner.of(BlogpostModel, {
            approved: true
          })
            .with('blogger')
            .with('topic')
        }
      }
    };
  }

  public constructor(
    private metatagService: MetatagService,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.metatagService.setModel(this.item);
  }

}