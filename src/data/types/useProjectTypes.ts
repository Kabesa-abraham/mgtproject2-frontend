export type UserPreview = {
    _id: string
    firstName: string
    lastName: string
    email: string
    image: string
}
export type project = {
    _id: string,
    projectName: string,
    projectDesc: string,
    creator: UserPreview,
    members: UserPreview[],
    createdAt: string,
    updatedAt: string
}