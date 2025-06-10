# Overview
 A lightweight scrollspy library for React projects

## Prerequisites
- React
- Node
- NPM

## Installation
```
npm install @ehubbell/react-scrollspy
```

## Usage
Import this project in your `_app.tsx` file and then pass to the `InterfaceProvider` context as shown.

```tsx
import ScrollSpy from '@ehubbell/react-scrollspy';
import { useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';

import { Col, Container, Grid } from '@playbooks/ui/grid';
import { AppWrapper } from 'components/app/app-wrapper';
import { DocSidebar } from 'components/doc/doc-sidebar';
import { mdxDecorators } from 'decorators';

const DetailPage = ({ ssr, account, router, session, store, toast }) => {
	const doc = ssr.doc?.data;
	const ref = useRef(null);

	// Methods
	const onUpdate = props => console.log('onUpdate: ', props);

	// Render
	return (
		<AppWrapper breadcrumbs>
			<Container size='xl' height='h-full' className='py-4'>
				<Grid height='h-full'>
					<Col lg='9' className='markdown'>
						<ScrollSpy
							navRef={ref}
							dataAttribute='scrollspy'
							offsetTop={100}
							onUpdate={onUpdate}
							activeClass='active'
							debug>
							<MDXRemote {...doc.content} components={mdxDecorators} />
						</ScrollSpy>
					</Col>
					<Col lg='3' border='md:border-l' className='hidden lg:block'>
						<DocSidebar ref={ref} doc={doc} />
					</Col>
				</Grid>
			</Container>
		</AppWrapper>
	);
};

export default DetailPage;
```

## Development
This project is setup to use `yalc` for local development.

## Scripts
- We've included a couple of helpful scripts for faster development.
- deploy: `npm run deploy -- 'commit message'`
- publish: `npm run publish -- 'commit message' [major|minor|patch]`

## Husky
- Husky configuration is setup to lint and format the repo on every commit
- Edit the `.husky/pre-commit` file to change your settings

## Yalc
- When adding this library to another React project via `npm link` the two versions of react will clobber each other.
- To avoid this, you'll need to use `yalc` which creates a local package store as opposed to linking binaries.

## Author
- Eric Hubbell
- eric@erichubbell.com