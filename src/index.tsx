import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';

export interface ScrollSpyProps {
	navRef?: MutableRefObject<HTMLDivElement | null>;
	activeClass?: string;
	dataAttribute?: string;
	offsetTop?: number;
	offsetBottom?: number;
	throttle?: number;
	updateHistory?: boolean;
	onUpdate?: (id: string) => void;
	children: ReactNode;
}

const ScrollSpy = ({
	navRef,
	activeClass = 'active',
	dataAttribute = 'scrollspy',
	offsetTop = 0,
	offsetBottom = 0,
	throttle = 300,
	updateHistory = true,
	onUpdate,
	children,
}: ScrollSpyProps) => {
	const containerRef = useRef(null);
	const [navItems, setNavItems] = useState(null);
	const activeElement = useRef('');

	// Hooks
	useEffect(() => {
		if (navRef) {
			const items = navRef.current?.querySelectorAll(`[data-${dataAttribute}]`);
			setNavItems(items);
		} else {
			const items = document.querySelectorAll(`[data-${dataAttribute}]`);
			setNavItems(items);
		}
	}, [navRef]);

	useEffect(() => {
		updateScrollSpy();
	}, [navItems]);

	useEffect(() => {
		window.addEventListener('scroll', scrollEvent);
		return () => window.removeEventListener('scroll', scrollEvent);
	}, [containerRef, navItems]);

	// Functions
	function scrollEvent() {
		setTimeout(updateScrollSpy, throttle);
	}

	function checkVisibility(el: HTMLElement) {
		const rectInView = el.getBoundingClientRect();

		const useHeight = containerRef?.current ? containerRef?.current.offsetHeight : window.innerHeight;
		const hitbox_top = useHeight;
		const element_top = rectInView.top;
		const element_bottom = rectInView.top + useHeight;
		return hitbox_top < element_bottom + offsetBottom && hitbox_top > element_top - offsetTop;
	}

	function updateScrollSpy() {
		const container = containerRef.current;
		if (!(container && navItems)) return;

		for (let i = 0; i < container.children.length; i++) {
			const scrollElement = container.children.item(i) as HTMLDivElement;
			const scrollElementVisible = checkVisibility(scrollElement);

			if (scrollElementVisible) {
				const scrollElementId = scrollElement.id;

				if (activeElement.current === scrollElementId) return;

				const computedElementId = scrollElementId || activeElement.current;

				navItems.forEach(element => {
					const attrId = element.getAttribute(`data-${dataAttribute}`);

					if (attrId !== computedElementId && element.classList.contains(activeClass))
						element.classList.remove(activeClass);

					if (attrId === computedElementId && !element.classList.contains(activeClass)) {
						element.classList.add(activeClass);

						if (onUpdate) onUpdate(computedElementId);

						activeElement.current = computedElementId;
						if (updateHistory) window.history.replaceState({}, '', `#${scrollElementId}`);
					}
				});
				break;
			}
		}
	}

	return <div ref={containerRef}>{children}</div>;
};

export default ScrollSpy;

// Docs
// - The checkVisibility method checks which element is passing the nearing the window threshold.
// - Since this isn't always the case, we compute whether the element has changed.
