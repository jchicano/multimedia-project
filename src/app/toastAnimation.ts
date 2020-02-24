import { Animation } from '@ionic/core';

export function toastAnimation(
    AnimationC: Animation,
    baseEl: ShadowRoot,
    position: string
): Promise<Animation> {
    const baseAnimation = new AnimationC();

    const wrapperAnimation = new AnimationC();

    const hostEl = (baseEl.host || baseEl) as HTMLElement;
    const wrapperEl = baseEl.querySelector(".toast-wrapper") as HTMLElement;

    wrapperAnimation.addElement(wrapperEl);

    const bottom = `calc(20px + var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(20x + var(--ion-safe-area-top), 0px))`;

    switch (position) {
        case "top":
            wrapperEl.style.top = top;
            wrapperEl.style.opacity = "1",
                wrapperAnimation.fromTo('transform', `translateY(-${hostEl.clientHeight}px)`, 'translateY(20px)')
            break;
        default:
            wrapperEl.style.bottom = bottom;
            wrapperEl.style.opacity = "1",
                wrapperAnimation.fromTo('opacity', 0.01, 1)
            break;
    }

    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(1000)
        .add(wrapperAnimation));

}