import { Injectable } from '@nestjs/common';
// import { BookEntity } from './entity/book.entity';
import { DoctorEntity } from './entity/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { AddBookArgs } from './args/add.book.args';
import { AddDoctorArgs } from './args/add.doctor.args';
// import { UpdateBookArgs } from './args/updatebook.args';


@Injectable()
export class DoctorService {

  constructor(@InjectRepository(DoctorEntity) public readonly doctorRepo: Repository<DoctorEntity>) { }

  // public booksData : BookEntity[] = [];
  // addbook(book: BookEntity) : string{

  async addDoctorProfile(addDoctorArgs: AddDoctorArgs): Promise<string> {
    // this.booksData.push(book);
    let doctor: DoctorEntity = new DoctorEntity();
    doctor.college = addDoctorArgs.college;
    doctor.course = addDoctorArgs.course;
    await this.doctorRepo.save(doctor);
    return "Doctor Profile Added Successfully Save in db";
  }

  // updatedBook(id: number, updatedBook: BookEntity): string{
  // async updatedBook(updatedBookArgs: UpdateBookArgs): Promise<string> {
  //   let book: BookEntity = await this.bookRepo.findOne({ where: { id: updatedBookArgs.id } });
  //   book.title = updatedBookArgs.title;
  //   book.price = updatedBookArgs.price;
  //   await this.bookRepo.save(book);
  //   return "Book has been successfully updated in db"



    // for(let x =0; x<this.booksData.length; x++){
    //   if(this.booksData[x].id == id){
    //     this.booksData[x] = updatedBook;
    //     return "Book has been updated Successfully in db";
    //   }
    // }
  // }

  // async deleteBook(id: number): Promise<string> {
  //   await this.bookRepo.delete(id);
  //   // this.booksData = this.booksData.filter(book => book.id != id);
  //   return "book has been deleted";
  // }


  // async findBookById(id: number): Promise<BookEntity> {
  //   let book = await this.bookRepo.findOne({ where: { id: id } });
  //   return book;
  //   // for(let x =0; x<this.booksData.length; x++){
  //   //   if(this.booksData[x].id == id){
  //   //     return this.booksData[x];
  //   //   }
  //   // }
  // }


  async findAllBooks(): Promise<DoctorEntity[]> {
    let doctors = await this.doctorRepo.find();
    return doctors;
  }






}