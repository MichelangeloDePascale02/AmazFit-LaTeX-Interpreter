# AmazFit-LaTeX-Interpreter
An application for ZeppOS 4.0+ that allows you to view mathematical formulas, proofs, or simple notes on your watch.

What it can do:
- display numbers and basic operations using standard mathematical symbols
- display fractions using a linear format [e.g., (x+1) / (y-2)]
- graphically display numeric superscripts and subscripts
- display Greek letters and their corresponding symbols
- display complex operators [e.g., != as ≠, >= as ≥]
- display integrals and square roots

What it cannot do (at the moment):
- display "complex" subscripts and superscripts (such as 1+x); in this case, the app reverts to underscore notation [e.g., 5_(1+x)]
- display Greek letters as subscripts or superscripts
- anything else not specified in the "What it can do" section

The app relies on a companion app accessible via the Zepp app on your device.
Currently, the app has only been tested on the AmazFit Active 2. Scaling, resizing, and layout limits are certainly not 100% perfect; any feedback is welcome. At the moment, I am unable to test resizing and—even more importantly—performance on older watches and/or those with rectangular screens.

Any limitations mentioned in this README are primarily due to the limited resources of AmazFit devices and the scarcity of APIs suitable for the app's purpose. While technically feasible, more "complex" visualizations would require rendering a large number of widgets, making the app very slow and difficult to use.

This project is intended as a simple experiment for fun. Part of the app's code was generated with the help of Gemini Pro 3.1 and Gemini Flash 3.8.
