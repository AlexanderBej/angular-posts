import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'initials'
})
export class InitialsPipe implements PipeTransform {
    transform(fullName: string | undefined): string {
        let name = ''
        if (fullName) {
            name = fullName.split('').map(n => n[0]).join('')
            if (name.length > 2) {
                name = name.charAt(0) + name.slice(-1);
            }

        }

        return name.toUpperCase();
    }
}
