import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null || searchText == '') {
      return categories;
    } else {
      let filteredCategories = [];
      categories.filter(function(category){
        category.filter(function(subCategory, index) {
          //Search only by second criteria (in this case name)
          if(index == 1) {
            if(subCategory.toString().toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
              if(filteredCategories.indexOf(subCategory) == -1) {
                filteredCategories.push(category);
              }
            }
          }
        });
      });
      return filteredCategories;
    }
  }
}