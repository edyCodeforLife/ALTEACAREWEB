declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.html' {
    const content: string;
    export default content;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module NodeJS {
    interface Process extends NodeJS.Process {
        browser?: string
    }
}

declare module 'react-custom-scroll';

declare module 'styled-components';