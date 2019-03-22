window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;


	if (window.innerWidth < 700) {
		document.getElementById('navbar').style.display= 'none';
	}
	else {
		if (currentScrollPos > 300) {
			document.getElementById('navbar').style.top = '0';
		}
		else {
			document.getElementById('navbar').style.top = '-80px';
		}
	}


}


$(document).ready(function () {
	const $cont = $('.cont');
	const $slider = $('.slider');
	const $nav = $('.nav');
	const winW = $(window).width();
	const animSpd = 750; // Change also in CSS
	const distOfLetGo = winW * 0.2;
	let curSlide = 1;
	let animation = false;
	let autoScrollVar = true;
	let diff = 0;

	// Generating slides
	let photoArr = ['Amsterdam', 'Rome', 'New—York', 'Singapore']; // Change number of slides in CSS also
	let photoNum = photoArr.length;
	let photoArrDivided = [];

	photoArr.map((photo) => {
		let length = photo.length;
		let letters = Math.floor(length / 4);
		let exp = new RegExp(".{1," + letters + "}", "g");

		photoArrDivided.push(photo.match(exp));
	});

	let generateSlide = function (photo) {
		let frag1 = $(document.createDocumentFragment());
		let frag2 = $(document.createDocumentFragment());
		const numSlide = photoArr.indexOf(photoArr[photo]) + 1;
		const firstLetter = photoArrDivided[photo][0].charAt(0);

		const $slide =
			$(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>
							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
						</div>`);

		const letter =
			$(`<div class="slide__letter slide--${numSlide}__letter">
							${firstLetter}
						</div>`);

		for (let i = 0, length = photoArrDivided[photo].length; i < length; i++) {
			const text =
				$(`<div class="slide__text slide__text--${i + 1}">
								${photoArrDivided[photo][i]}
							</div>`);
			frag1.append(text);
		}

		const navSlide = $(`<li data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></li>`);
		frag2.append(navSlide);
		$nav.append(frag2);

		$slide.find(`.slide--${numSlide}__text-wrapper`).append(letter).append(frag1);
		$slider.append($slide);

		if (photoArr[photo].length <= 4) {
			$('.slide--' + numSlide).find('.slide__text').css("font-size", "12vw");
		}
	};

	for (let i = 0, length = photoNum; i < length; i++) {
		generateSlide(i);
	}

	$('.nav__slide--1').addClass('nav-active');

	// Navigation
	function bullets(dir) {
		$('.nav__slide--' + curSlide).removeClass('nav-active');
		$('.nav__slide--' + dir).addClass('nav-active');
	}

	function timeout() {
		animation = false;
	}

	function pagination(direction) {
		animation = true;
		diff = 0;
		$slider.addClass('animation');
		$slider.css({
			'transform': 'translate3d(-' + ((curSlide - direction) * 100) + '%, 0, 0)'
		});

		$slider.find('.slide__darkbg').css({
			'transform': 'translate3d(' + ((curSlide - direction) * 50) + '%, 0, 0)'
		});

		$slider.find('.slide__letter').css({
			'transform': 'translate3d(0, 0, 0)',
		});

		$slider.find('.slide__text').css({
			'transform': 'translate3d(0, 0, 0)'
		});
	}

	function navigateRight() {
		if (!autoScrollVar) return;
		if (curSlide >= photoNum) return;
		pagination(0);
		setTimeout(timeout, animSpd);
		bullets(curSlide + 1);
		curSlide++;
	}

	function navigateLeft() {
		if (curSlide <= 1) return;
		pagination(2);
		setTimeout(timeout, animSpd);
		bullets(curSlide - 1);
		curSlide--;
	}

	function toDefault() {
		pagination(1);
		setTimeout(timeout, animSpd);
	}

	// Events
	$(document).on('mousedown touchstart', '.slide', function (e) {
		if (animation) return;
		let target = +$(this).attr('data-target');
		let startX = e.pageX || e.originalEvent.touches[0].pageX;
		$slider.removeClass('animation');

		$(document).on('mousemove touchmove', function (e) {
			let x = e.pageX || e.originalEvent.touches[0].pageX;
			diff = startX - x;
			if (target === 1 && diff < 0 || target === photoNum && diff > 0) return;

			$slider.css({
				'transform': 'translate3d(-' + ((curSlide - 1) * 100 + (diff / 30)) + '%, 0, 0)'
			});

			$slider.find('.slide__darkbg').css({
				'transform': 'translate3d(' + ((curSlide - 1) * 50 + (diff / 60)) + '%, 0, 0)'
			});

			$slider.find('.slide__letter').css({
				'transform': 'translate3d(' + (diff / 60) + 'vw, 0, 0)',
			});

			$slider.find('.slide__text').css({
				'transform': 'translate3d(' + (diff / 15) + 'px, 0, 0)'
			});
		})
	})

	$(document).on('mouseup touchend', function (e) {
		$(document).off('mousemove touchmove');

		if (animation) return;

		if (diff >= distOfLetGo) {
			navigateRight();
		} else if (diff <= -distOfLetGo) {
			navigateLeft();
		} else {
			toDefault();
		}
	});

	$(document).on('click', '.nav__slide:not(.nav-active)', function () {
		let target = +$(this).attr('data-target');
		bullets(target);
		curSlide = target;
		pagination(1);
	});

	$(document).on('click', '.side-nav', function () {
		let target = $(this).attr('data-target');

		if (target === 'right') navigateRight();
		if (target === 'left') navigateLeft();
	});


});

var video1Div = document.getElementById('video1');
var video2Div = document.getElementById('video2');
var video3Div = document.getElementById('video3');
var videoPlayer = document.getElementById('videoPlayer');

video1Div.addEventListener('click', function () {
	videoPlayer.src = "";
	videoPlayer.src = "https://www.youtube.com/embed/Og6c-6WnCRc";
});

video2Div.addEventListener('click', function () {
	videoPlayer.src = "";
	videoPlayer.src = "https://www.youtube.com/embed/zGUJGENehk0";
});

video3Div.addEventListener('click', function () {
	videoPlayer.src = "";
	videoPlayer.src = "https://www.youtube.com/embed/Y-EqbgCYvYo";
})
