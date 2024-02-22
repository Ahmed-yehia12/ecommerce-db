export class ApiFeatures {
    constructor(mongooseQuery , searchQuery){
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }
    pagination(){
if(this.searchQuery.page <=0) this.searchQuery.page = 1
let pageNumber = this.searchQuery.page *1||1
let limitPage = 8
let skipPage = (pageNumber-1)*limitPage

this.pageNumber = pageNumber
this.mongooseQuery.skip(skipPage).limit(limitPage)
return this
    }
    filter(){
        let filterObj ={...this.searchQuery}
        let excludedFields = ['page','sort','fields','keyword']
        excludedFields.forEach((val)=>{
            delete filterObj[val]
        
        })
        filterObj= JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lte|lt)/g,(match)=>{
            console.log(match);
            return '$'+ match
        })
        filterObj = JSON.parse(filterObj)
        console.log(filterObj);
        this.mongooseQuery.find(filterObj)
        return this
    }
    sort(){
        if(this.searchQuery.sort){

            let sortBy = this.searchQuery.sort.split(',').join(' ')
            console.log(sortBy);
            this.mongooseQuery.sort(sortBy)
         
        }
        return this
    }
    fields(){
        if(this.searchQuery.fields){

            let fields = this.searchQuery.fields.split(',').join(' ')
            console.log(fields);
            this.mongooseQuery.select(fields)
          
        }
        return this 

    }
    search(){
        if(this.searchQuery.keyword){

            this.mongooseQuery.find({$or:[
                {title:{$regex:this.searchQuery.keyword}},
                {description:{$regex:this.searchQuery.keyword}},
        
            ]}) 

            }
                        return this

    }
}