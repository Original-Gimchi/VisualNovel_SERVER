class UserSignUpDto {

    belonging!: string

    email!: string

    nickName!: string

    password!: string


    constructor(belonging: string, email: string, nickName: string, password: string) {
        this.belonging = belonging;
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }
}

export default UserSignUpDto
