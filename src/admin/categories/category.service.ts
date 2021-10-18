import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryRepository } from "./category.repository";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) { }
    async create(categoryDto: CreateCategoryDTO) {
        const result = await this.categoryRepository.insert(categoryDto).catch(err => {
            throw new HttpException("افزودن دسته بندی انجام نشد", 500)
        })
        if (!result.raw.insertId) throw new HttpException("افزودن دسته بندی انجام نشد", 500)
        return await this.categoryRepository.findOne({ id: result.raw.insertId });
    }
    async findById(id: number) {
        if(!isNaN(id)){
            const category = await this.categoryRepository.findOne({ id })
            if (!category) throw new NotFoundException("دسته بندی یافت نشد")
            return category
        }
        throw new BadRequestException("شناسه ی وارد شده ی صحیح نمیباشد")
    }
    async findAll() {
        const categories = await this.categoryRepository.find({}).catch(err => {
            throw new HttpException("لیست دسته بندی ها دریافت نشد", 500)
        })
        return categories
    }

    async delete(id: number) {
        const category = await this.findById(id)
        const result = await this.categoryRepository.remove(category);
        return result
    }
    async update(id: number, updateDto: UpdateCategoryDTO) {
        await this.findById(id);
        const result = await this.categoryRepository.update({ id }, { ...updateDto }).catch(err => {
            throw new HttpException("به روز رسانی دسته بندی انجام نشد", 500)
        })
        if (!result.affected) throw new HttpException("به روز رسانی انجام نشد مجددا تلاش کنید", 500)
        return await this.findById(id);
    }
}