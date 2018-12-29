import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../post.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  //count = 0;

  constructor(public postsService: PostsService) {}
  private postsSub: Subscription;
  ngOnInit() {
    this.postsService.getPost();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  onLike(postId: string) {
    //this.count = this.count + 1;
    //this.postsService.likePost(this.count, postId);
    this.postsService.likePost(postId);
  }
}
