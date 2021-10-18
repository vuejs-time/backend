import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

@ApiTags("Category")
@Controller('/category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }
    @ApiCreatedResponse()
    @Post('/')
    async createCategory(@Body() createDto: CreateCategoryDTO) {
        const category = await this.categoryService.create(createDto)
        return {
            status: 201,
            success: true,
            message: "ایجاد دسته بندی با موفقیت انجام شد",
            category
        }
    }
    @ApiOkResponse()
    @Get("/")
    async getAllBlogs() {
        const categories = await this.categoryService.findAll();
        return {
            status: 200,
            success: true,
            categories
        }
    }
    @ApiOkResponse()
    @Get("/:categoryId")
    async findCategoryId(@Param('categoryId') id: number) {
        const category = await this.categoryService.findById(id)
        return {
            status: 200,
            success: true,
            category
        }
    }
    @ApiAcceptedResponse()
    @Delete("/:categoryId")
    async removeCategory(@Param('categoryId') id: number) {
        const category = await this.categoryService.delete(id)
        return {
            status: 200,
            success: true,
            message: "حذف دسته بندی با موفقیت انجام شد",
            category
        }
    }
    @ApiOkResponse()
    @Patch("/:categoryId")
    async updateCategory(@Param('categoryId') id: number, @Body() updateDto: UpdateCategoryDTO) {
        const category = await this.categoryService.update(id, updateDto)
        return {
            status: 200,
            success: true,
            message: "به روز رسانی دسته بندی با موفقیت انجام شد",
            category
        }
    }

}