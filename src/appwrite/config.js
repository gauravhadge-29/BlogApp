import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();

    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug, content, featuredImage,status, userId}){
        console.log(userId)
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite service :: CreatePost :: error",error)
        }
    }

    async updatePost(slug, {title, content, featuredImage,status}){
        try {
            console.log("Updating data , new data :: ",{title, content, featuredImage,status})
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
             console.log("Appwrite service :: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error)
            return false
        }
    }


    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error)
            return false
        }
    }

    async getFileView(fileId) {
            return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    }


    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error)
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID,

            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error)
            return false
        }
    }

    //fast response 

    getFilePreview(fileId){ 
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }


};

const service = new Service()

export default service