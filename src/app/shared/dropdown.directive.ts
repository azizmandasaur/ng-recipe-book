import { Directive, OnInit, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('click') ontoggle() {
        this.isOpen = !this.isOpen;
    }
}