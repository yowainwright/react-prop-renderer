/// <reference types="react" />
export declare type Endpoint = string | number | Array<Endpoint> | {
    [key: string]: Endpoint;
} | null;
export declare type EndpointRendererProps = {
    endpoint: Endpoint;
    depth?: number;
    id?: string;
};
export declare type EndpointRendererPortalProps = {
    children: JSX.Element;
    container: HTMLElement | null;
};
export declare const isSingleValue: (endpoint: Endpoint) => boolean;
export declare function EndpointRenderPortal({ children, container }: EndpointRendererPortalProps): JSX.Element | null;
export declare function EndpointRendererContent({ endpoint, depth }: EndpointRendererProps): JSX.Element;
export declare function EndpointRenderer({ endpoint, depth, id, }: EndpointRendererProps): JSX.Element;
export default EndpointRenderer;
