export class UserDTO {
    public readonly email: string;
    public readonly role: 'user' | 'admin';
    public readonly ixp: number;
    public readonly axp: number;

    constructor(
        email: string,
        role: 'user' | 'admin',
        ixp: number,
        axp: number,
    ) {
        this.email = email;
        this.role = role;
        this.ixp = ixp;
        this.axp = axp;
    }
}
