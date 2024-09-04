import * as  bcrypt from 'bcrypt'


export async function endCodePassword(rawPassword:string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt)
}