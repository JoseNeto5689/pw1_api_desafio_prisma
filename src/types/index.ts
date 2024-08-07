export type User = {
    id: string,
    name: string,
    user_name: string,
}

export type Technology = {
    id: string, 
    title: string,
    studied: boolean,
    deadline: Date,
    created_at: Date
    userId: string
}