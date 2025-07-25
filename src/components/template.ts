export default `<template id="setting-section">
	<h1></h1>
	<slot></slot>
</template>


<template id="setting-panel">
	<slot></slot>
</template>


<template id="setting-list">
	<setting-item data-direction="row" class="hidden">
		<h2></h2>
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M21 8L12 17L3 8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
		</svg>
	</setting-item>
	<slot></slot>
</template>


<template id="setting-item">
	<slot></slot>
</template>


<template id="setting-select">
	<div class="select">
		<div class="menu-button">
			<input type="text" readonly spellcheck="false" placeholder="请选择">
			<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 6.0001L8.00004 10L4 6" stroke="currentColor" stroke-linejoin="round"></path>
			</svg>
		</div>
		<ul class="hidden">
			<slot></slot>
		</ul>
	</div>
</template>


<template id="setting-option">
	<li>
		<span>
			<slot></slot>
		</span>
		<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
		</svg>
	</li>
</template>


<template id="setting-switch">
	<span>
		<slot></slot>
	</span>
</template>


<template id="setting-button">
	<button>
		<slot></slot>
	</button>
</template>


<template id="setting-text">
	<slot></slot>
</template>


<template id="setting-link">
	<slot></slot>
</template>


<template id="setting-divider">
	<slot></slot>
</template>


<template id="setting-modal">
	<div class="modal"></div>
	<div class="main">
		<div class="container">
			<div class="header">
				<div class="title"></div>
				<svg class="close" viewBox="0 0 24 24">
					<use xlink:href="/_upper_/resource/icons/close_24.svg#close_24"></use>
				</svg>
			</div>
			<div class="body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>`