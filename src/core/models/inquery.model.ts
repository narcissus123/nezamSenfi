export interface IInquery {
    inqueryTitle : string,
    description :string,
    organizationId : null | { value : number , label : string} ,
    defaultLetterContent : string ,
    defaultLetterTitle : string
}