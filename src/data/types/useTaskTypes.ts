export type userPreview = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    image: string
}
export type projectPreview = {
    _id: string,
    projectName: string
}

export type task = {
    _id: string,
    taskName: string,
    taskDesc: string,
    status: string,
    assignedTo: userPreview,
    projectId: projectPreview,
    deadline: string,
    createdAt: string,
    updatedAt: string
}