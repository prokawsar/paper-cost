import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

tippy('[data-tippy]', {
	content: (reference) => reference.getAttribute('data-tippy') || '',
	allowHTML: true,
	placement: 'auto',
	arrow: true,
	delay: 100,
	animation: 'scale'
});
