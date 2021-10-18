export class Helpers{
   static removeEmptyFields(object){
        Object.keys(object).forEach(key => {
            if(!object[key]) delete object[key]
        })
    }
}