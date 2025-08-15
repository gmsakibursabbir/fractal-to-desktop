---
title: "Mandelbrot Set Basics"
pubDate: "2025-08-13"
author: "Shirom Makkad"
description: "Introduction Fractal To Desktop renders the Mandelbrot Set onto your desktop. The Mandelbrot Set is defined by the equation Z^2+C. If you’ve seen the video on the homepage, this probably makes no sense. How can an equation this simple create shapes like the Mandelbrot Set? Complex Numbers Firstly, Z and C are not normal numbers, they’re complex numbers. Complex numbers follow the format a+bi where “a” is the real number ,”b” is the imaginary number, and “i” is the square root of negative 1. When showing the Mandelbrot Set, you’re seeing the complex plane where the x-axis contains the real number component and the y-axis contains the imaginary number component. What this means is that this function takes in two complex numbers and outputs a different complex number that can …"
---

## Introduction

Fractal To Desktop renders the Mandelbrot Set onto your desktop. The Mandelbrot Set is defined by the equation Z^2+C. If you’ve seen the video on the homepage, this probably makes no sense. How can an equation this simple create shapes like the Mandelbrot Set?

## Complex Numbers

Firstly, Z and C are not normal numbers, they’re complex numbers. Complex numbers follow the format a+bi where “a” is the real number ,”b” is the imaginary number, and “i” is the square root of negative 1. When showing the Mandelbrot Set, you’re seeing the complex plane where the x-axis contains the real number component and the y-axis contains the imaginary number component. What this means is that this function takes in two complex numbers and outputs a different complex number that can be plotted in the complex plane.

## How the Mandelbrot Set is calculated

1: (0 + 0i)(0 + 0i) + (0.5+0.5) = (0.5 + 0.5i)

2: (0.5 + 0.5i)(0.5 + 0.5i) + (0.5 + 0.5i) = (0.5 + 1i)

3: (0.5 + 1i)(0.5 + 1i) + (0.5 + 0.5i) = (-0.25, 1.25i)

4: (-0.25 + 1.25i) (-0.25 + 1.25i) + (0.5 + 0.5i) = (-1+ -0.125i)

5: (-1+ -0.125i)(-1+ -0.125i) + (0.5 + 0.5i) = (1.48 + 0.75i)

And so on…

Almost all the points that are inside the set fall towards the center (the rest go into repeating or nearly repeating patterns and stay less than 2):

![Right Triangle](/images/screenshot-15.png)

Points that are on the outside of the set and far away from the center tend towards infinity:

![Right Triangle](/images/screenshot-13-264x300.png)

However, the interesting thing happens with points on the edge. They may either go towards infinity or towards the center. Here’s one that goes towards infinity:

![Right Triangle](/images/screenshot-17-264x300.png)

And here’s one right next to it that tends towards 0:

![Right Triangle](/images/screenshot-18-268x300.png)

This is how we determine whether the point is within the Mandelbrot Set. If the point goes out to infinity, it’s outside of the set, and if the point stays near 0, it’s inside of the set. More specifically, if the point goes out beyond 2 (that’s where the purple circle is), it’s defined as gone to infinity, and if the point hits the maximum number of iterations and is less than 2, we just assume it won’t go to infinity and leave it as 0. In this case, the maximum number of iterations (remember that’s the number of times we put the point through Z^2+C) is 200.

If you’d like to see these “orbits” (paths that points take in the Mandelbrot Set as they’re calculated), take a look at http://www.stefanbion.de/fraktal-generator/mandeliteration.html made by Stefan Bion. He’s on fractalforums.org along with a lot of other people who contribute to the Fractal community.

## Maximum Iterations

If you look at the photos from above where the point tended towards 0, you’ll notice that the iteration was 200. This is where we cut off the iterations and said it’s probably going towards 0 at this point. That cutoff is called the maximum iteration. If we didn’t define a maximum iteration, we’d be calculating forever, but a maximum iteration of 200 isn’t enough deeper in the set. Take a look at this “Minibrot” (a miniature version of the Mandelbrot Set that can be found elsewhere inside the set).

![Right Triangle](/images/screenshot-46-300x243.png)

As you can see, its edges aren’t well defined. Now look at it at 700 iterations. It looks much more like the normal Mandelbrot Set.

![Right Triangle](/images/screenshot-47-300x294.png)

At 200 iterations, the number would oscillate for 200 iterations and the maximum iteration was hit, so we’d stop calculating. Some of those point which we cut short may have bailed at 667 iterations or 530, etc. When increasing the iteration count, we can see more detail. Eventually, the amount of detail we can see is too small to fit into a pixel, so we stop increasing the iteration (and save CPU power). When we zoom in, we see more details, requiring an increase the iteration count again.

Images go much deeper than 200 or 700 iterations. This is a picture of Dinkydau’s Flake which I like to render at 40,000 iterations. This image is found at a depth of 2^522. For reference, Fractal To Desktop supports a depth of up to 2^1024: the equivalent of zooming from the size of the observable universe down to the size of a hydrogen atom 8.5 times.

And this is the deepest image of a Minibrot I could find with a maximum iteration of 1100100100 and a depth of 10^10^6.

![Right Triangle](/images/p830484-1e1e6-n1100100100-300x169.jpg)

## A Quick Overview of Depth in the Mandelbrot Set

Earlier I mentioned the concept of depth also known as magnification. Fractal To Desktop has a limit of 2^1024, Dinkydau’s Flake was at 2^522, etc. What does this magnification represent? Normally when looking at the full Mandelbrot Set, you’re seeing it from (-2 + 0i) to (2 + 0i). It has a view radius of 2. To view a point, you just translate this view area over the point. Zooming takes place by dividing the radius by some fixed number, usually 2. That’s why zooms are often represented by 2^x, because you’re zooming in multiples of 2. What this means is that with a magnification of 2^522, you’re actually taking the radius of 2 and dividing it by 2^522.

You may be wondering, why 2? There’s no real reason that it has to be this way; it just looks the nicest. Increasing this number increases the distance between frames that you render and lowering it decreases it. For Fractal To Desktop, you can see these frames in Documents/Fractal To Desktop/Frame Buffer. Unlike most programs, Fractal To Desktop will allow you to change this value. It’s called the Pixelation value. If the distance between frames is higher (the pixelation), Fractal To Desktop will still have to put the image on a 1920×1080 screen or whatever screen you have, but the minimum size of the image may be 1/3rd of that or even less. The default is 2, because it halves the size, which I’ve found to be a good tradeoff between performance and looks. Now that you know how it works, you’ll be better equipped to modify this value.

## Automatic Maximum Iteration

We’ve already established that the optimal max iteration changes as you zoom. Too low, and you’re not getting all the detail you want. Too high, and you’re doing extra calculations. Unlike most other programs, Fractal To Desktop isn’t designed for user intervention of these values, so people can enjoy Fractals without having to know a lot of math. To accomplish this, Fractal To Desktop must automatically determine the maximum iteration. Disclaimer: this algorithm was shown to me by Claude Heiland-Allen on fractalforums.org and he got the algorithm from Robert Munafo on mrob.com/pub/muency.html.

To determine the optimal maximum iteration, Fractal To Desktop starts off at 250 iterations, and it doubles the iteration count. If very few pixels are found to be greater than 2 (pixels that escape to infinity), we assume that increasing the iteration count doesn’t increase the detail. It adds very little to the image. If a lot of pixels escape, we assume that we can keep increasing the iteration count until the rate of pixels escaping is small. There are sometimes issues with this, and I’ll be continually tuning this algorithm over time.

## Resources

<a href="https://fractalforums.org/">Fractalforums.org</a> and <a href="https://fractalforums.com/">fractalforums.com</a> are great resources to find like-minded people who enjoy Fractals

<a href="https://sourceforge.net/projects/xaos/">Xaos</a> is a great piece of software to view Fractals that’s easy to use and has a lot of features. Try pressing j and click on the Mandelbrot Set for one of my favorites.

<a href="https://mathr.co.uk">Mathr.co.uk</a> is also a very good resource. It’s run by a researcher named Claude Heiland-Allen. It has a ridiculous amount of code that’s really good, and it has tons of articles throughout the site that are very helpful. I even found drafts of a book he’s writing publicly available on his code repository on his site. The only problem is that there’s so much content, it’s hard to find what you’re looking for.

<a href="https://mrob.com/pub/muency.html">mrob.com/pub/muency</a> is another great site run by Robert Munafo. It has a lot of definitions defined in layman’s terms and algorithms described in ways that you can understand if you’re not a researcher. It’s very helpful. The site is very old, so newer discoveries aren’t on there.
