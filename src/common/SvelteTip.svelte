<script lang="ts">
	import { TooltipStyle } from 'src/constants/enums';

	import { onDestroy } from 'svelte';

	export let timeout = 500;
	export let tooltipStyle: TooltipStyle = TooltipStyle.RIGHT_START;
	export let tooltipClass = '';
	export let showing = false;
	export let disabled = false;
	export let hiddenFirst = false;
	export let tooltipPositionerStyle = '';

	const prevDisabled: any = { current: disabled };

	let hovered = false;
	const timer: any = { current: null };
	let helper: any;

	const prevContent: any = { current: null, mouseEnterListener: null, mouseLeaveListener: null };
	$: content = hiddenFirst ? helper?.nextElementSibling : helper?.previousElementSibling;
	$: contentClass = content?.className.split(' ')?.find((c: any) => c.indexOf('s-') === 0);
	$: tooltip = helper?.childNodes[0];
	$: {
		tooltip;
		if (content && (prevContent.current !== content || prevDisabled.current !== disabled)) {
			const mouseEnterListener = () => {
				timer.current = setTimeout(() => {
					hovered = true;
					if (content?.style) {
						content.style.zIndex = 1;
					}
					timer.current = null;
				}, timeout);
			};
			const mouseLeaveListener = () => {
				if (timer.current) {
					clearTimeout(timer.current);
				}
				hovered = false;
				if (content?.style) {
					content.style.zIndex = 0;
				}
			};
			const prevContentEl: any = prevContent.current;
			if (prevContentEl) {
				prevContentEl.removeEventListener('mouseenter', prevContent.mouseEnterListener);
				prevContentEl.removeEventListener('mouseleave', prevContent.mouseLeaveListener);
			}

			if (!disabled) {
				content.id += 'TOOLTIP_container';

				prevContent.current = content;
				prevContent.mouseEnterListener = mouseEnterListener;
				prevContent.mouseLeaveListener = mouseLeaveListener;

				content?.addEventListener('mouseenter', mouseEnterListener);
				content?.addEventListener('mouseleave', mouseLeaveListener);
			} else {
				content.id = '';
			}
		}

		prevDisabled.current = disabled;
	}
	$: {
		tooltip;
		contentClass;
		if (content) {
			if (showing || hovered) {
				content?.appendChild(tooltip);
			} else {
				try {
					content?.removeChild(tooltip);
				} catch (err) {}
			}
		}
	}

	onDestroy(() => {
		if (prevContent.current) {
			const test: any = prevContent.current;
			test.removeEventListener('mouseover', prevContent.mouseEnterListener);
			test.removeEventListener('mouseleave', prevContent.mouseLeaveListener);
		}
	});
</script>

{#if hiddenFirst}
	<div class="hidden" bind:this={helper}>
		<div class={`TOOLTIP_tooltip-positioner ${tooltipStyle}`} style={tooltipPositionerStyle}>
			<div class={`${tooltipClass} ${contentClass} TOOLTIP_tooltip_container ${tooltipStyle}`}>
				<slot name="t">tooltip</slot>
			</div>
		</div>
	</div>
{/if}
<slot />
{#if !hiddenFirst}
	<div class="hidden" bind:this={helper}>
		<div class={`TOOLTIP_tooltip-positioner ${tooltipStyle}`} style={tooltipPositionerStyle}>
			<div class={`${tooltipClass} ${contentClass} TOOLTIP_tooltip_container ${tooltipStyle}`}>
				<slot name="t">tooltip</slot>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	:global(#TOOLTIP_container) {
		position: relative;
		cursor: context-menu;
	}
	:global(.TOOLTIP_tooltip_container) {
		position: relative;
		cursor: help;
		z-index: 999;
		font-family: sans-serif;
	}
	.TOOLTIP_tooltip-positioner {
		position: absolute;
		pointer-events: none;
		width: 100vw;
		height: 100vh;
		display: flex;
		top: -5px;

		&.RIGHT_START {
			left: 5px;
		}
		&.CENTER {
			left: 50%;
			transform: translateX(-50%);
		}
		&.LEFT_END {
			right: 10px;
		}

		&.BOTTOM_CENTER {
			left: 50%;
			transform: translateX(-50%);
			top: calc(100% + 5px);
		}
	}
	.TOOLTIP_tooltip_container {
		position: absolute;

		max-width: 500px;
		border-radius: 5px;
		background-color: blue;
		color: white;
		padding: 5px;
		transform: translateY(-100%);
		top: 0;
		font-size: 15px;

		&.RIGHT_START {
			left: 0;
		}
		&.CENTER {
			left: 50%;
			transform: translate(-50%, -100%);
		}
		&.LEFT_END {
			right: 0;
		}

		&.BOTTOM_CENTER {
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.hidden {
		display: none;
	}
</style>
