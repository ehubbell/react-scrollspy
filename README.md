# Overview
A lightweight scrollspy library for React projects.
We built it to maintain state for Scrollspy elements after they exit the DOM while simplifying the code for future expansion.

## Installation
```
npm install @ehubbell/scrollspy
```

## Usage
Simply wrap your element(s) containing the IDs you want to track with the `<ScrollSpy` component.
Then, set a `ref` to the parent element containing the navigation elements and pass it into the `ScrollSpy` component.
This will narrow the document search down to a smaller set of elements for attribute updates.
Finally, make sure the navigation elements contain the `data-scrollspy` attribute with matching IDs.

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
This project uses [yalc](https://npmjs.com/package/yalc) for local development.
- npm run dev
- switch to project
- npx yalc add @ehubbell/scrollspy
- After that, this library should hot reload into the consuming application

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
- [Eric Hubbell](http://www.erichubbell.com)
- eric@erichubbell.com