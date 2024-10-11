export interface UserModel{
    id: number;
    name: string;
    password: string
    type: UserType
}

enum UserType {
    Administrador = 0,
    Cliente = 1
}