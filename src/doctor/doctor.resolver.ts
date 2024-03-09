import {Resolver,Query, Args, Int,Mutation} from "@nestjs/graphql";
import {Doctor} from "./schema/doctor.schema";
// import {Book as BookModel} from './../graphql'
import { DoctorService } from "./doctor.service";
import { AddDoctorArgs } from "./args/add.doctor.args";
// import { UpdateBookArgs } from "./args/updatebook.args";
// @Resolver("Book")


@Resolver(of => Doctor)
export class DoctorResolver{
  // @Query("books")
  // Queries and Mutations
  constructor(private readonly doctorService: DoctorService){}
  
  @Query(returns => [Doctor],{name : "doctors"})
  getAllDoctors(): any{
    return this.doctorService.findAllBooks();
  }

  // @Query(returns => Doctor , {name : "findBookById", nullable: true})
  // getBookById(@Args({name: "bookId", type: ()=> Int}) id: number) {
  //   return this.bookService.findBookById(id); 
  // }
  
  // @Mutation(returns => String , {name : "deleteBookById"})
  // deleteBookById(@Args({name: "bookId", type: ()=> Int}) id: number)  {
  //   return this.bookService.deleteBook(id);
  // }

  @Mutation(returns => String , {name : "addDoctorProfile"})
  addDocotorProfile(@Args("addDoctorArgs") addDoctorArgs: AddDoctorArgs) {
    return this.doctorService.addDoctorProfile(addDoctorArgs);
  }
  
  // @Mutation(returns => String , {name : "updateBook"})
  // updateBook(@Args("updateBookArgs") updateBookArgs: UpdateBookArgs) {
  //   return this.bookService.updatedBook(updateBookArgs);
  // }




  // @Query((returns) => [Book],{name: "books"})
  // getAllBooks(){
  //   let arr : BookModel[] = [
  //     {id:1, title: "Harry Potter ", price: 400},
  //     {id:2, title: "Harry Potter 2", price: 500},
  //     {id:3, title: "Harry Potter 3", price: 600},
  //   ]
  // }
}