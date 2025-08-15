---
title: "Perturbation Theory"
pubDate: "2025-08-13"
author: "Shirom Makkad"
description: "Remember the program that I recommended in the last article called Xaos? If you downloaded that and zoomed in, you’ll notice that the screen gets very blurry. Here’s a picture of what I’m talking about: This problem has to do with the resolution of numbers inside a computer. Computers are either 32-bit or 64-bit and that corresponds to the size of the number the computer can use. The number of bits refer to the number of digits in base 2; a 64-bit number has ~15 digits in base 10 and 64 digits in base 2. As you zoom into the Mandelbrot Set, you need more precise numbers to show details. With a limit of 15 digits, you can’t show those details which causes the blurriness. We need to be able …"
---

Remember the program that I recommended in the last article called Xaos? If you downloaded that and zoomed in, you’ll notice that the screen gets very blurry. Here’s a picture of what I’m talking about:

![Right Triangle](/images/jhygr.png)

This problem has to do with the resolution of numbers inside a computer. Computers are either 32-bit or 64-bit and that corresponds to the size of the number the computer can use. The number of bits refer to the number of digits in base 2; a 64-bit number has ~15 digits in base 10 and 64 digits in base 2. As you zoom into the Mandelbrot Set, you need more precise numbers to show details. With a limit of 15 digits, you can’t show those details which causes the blurriness. We need to be able to set the precision of number that our computer uses.

## Arbitrary Precision

Arbitrary precision libraries like GNU MP allows the program to specify the precision they want, and the program will compute it. Problem solved! Right?? The problem with arbitrary precision is that it doesn’t circumvent the problem that computers come from the factory using 64-bit computation. If you want to do 65-bit computation, you have to create multiple 64-bit numbers to make sure you’re computing with exactly 65 bits. This adds a huge amount of overhead that isn’t normally there. This makes arbitrary computing hundreds of times slower even with the same or less complexity. Here’s a Codereview post, which I wrote before understanding this principle, that compares the speed between arbitrary vs non-arbitrary computing.

We’ve established that Arbitrary precision is incredibly slow. We want to minimize the amount of arbitrary precision that we used. To do so, we use Perturbation Theory.

## Perturbation Theory Basics

Perturbation theory hinges on the principle that the difference between two large numbers can be represented by small numbers. For example (Example from <a href="http://mathr.co.uk/mandelbrot/perturbation.pdf">http://mathr.co.uk/mandelbrot/perturbation.pdf</a> by Claude Heiland-Allen)

A = 123456798

B = 123456789

A − B = 9

64-bit computers may not be able to represent a number like 0.5437675423346574923657423954379657423 but it can represent 0.00000000000000000023 as 2.3\*10^-19. Remember when zooming that all your numbers are very close to each other. If you’re at a depth of 2^500, your numbers are in a range of roughly 2^500. Your smallest number could be 1.76549236547962359462379564792 and your largest could be 1.76549236547962359462379565569. There’s only a 3-digit difference. What if we could store the first digits that are the same in all the numbers in one arbitrary precision number. That’s what perturbation theory does.

If we say that the normal Mandelbrot set formula is Xn+1 = X^2n + X0 where n is the iteration number, the perturbation theory formula is ∆n+1 = 2Xn∆n + ∆^2n + ∆0 for the portion that can be represented by 64-bit computers and to calculate the full number you use ∆n = Yn − Xn where Yn is the final number and Xn is the arbitrary precision number that we’re using as a reference point at iteration n. The full formula and derivation can be found here: http://superfractalthing.co.nf/sft_maths.pdf.
