import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageModel } from "./image.model";
@Injectable({ providedIn: 'root' })
export class ImageService {
    constructor(private http: HttpClient) { }
    saveImage(imagemodel: ImageModel) {
        return this.http.post('http://localhost:8080/user/uploadUserImage', {imagemodel})
    }
}
