export interface ICategory {
    name:string,
    description: string,
    startColor: string,
    endColor: string,
    imgAddress: string,
    subCategories: [{name: string}]
}