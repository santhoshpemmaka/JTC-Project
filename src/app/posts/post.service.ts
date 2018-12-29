import { Post } from "./post.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OverlayPositionBuilder } from "@angular/cdk/overlay";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {}
  getPost() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        console.log("postDate: ", postData);
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, date: string, content: string) {
    const post: Post = {
      _id: null,
      title: title,
      date: date,
      content: content
    };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
  likePost(postid: string) {
    const id = {
      id: postid
    };
    this.http.post("http://localhost:3000/api/post", id).subscribe(() => {
      console.log("added");
      // console.log(count);
    });
  }
}
