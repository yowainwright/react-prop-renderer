import * as React from 'react';
import { EndpointRenderer } from '../src';

export default { title: 'Utility Components/EndpointRenderer' };

export const AsString = () => <EndpointRenderer endpoint={'foo'} />;

export const AsArray = () => <EndpointRenderer endpoint={['baz', 'buzz']} />;

export const AsObject = () => <EndpointRenderer endpoint={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' } }} />;

export const AsComplexObject = () => (
	<EndpointRenderer
		endpoint={{ foo: 'bar', baz: ['baz'], buzz: { test: 'foo' }, fluff: { test: { deepTest: 'bar' } } }}
	/>
);
