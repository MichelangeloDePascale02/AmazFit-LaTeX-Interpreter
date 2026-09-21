# AmazFit-LaTeX-Interpreter
An application for ZeppOS 4.0+ that allows you to view mathematical formulas, proofs, or simple notes on your watch.


<img width="466" height="466" alt="photo_2_2026-09-21_18-11-43" src="https://github.com/user-attachments/assets/53b55433-fbfa-4c12-b71c-4f397cea061d" />
<img width="466" height="466" alt="photo_1_2026-09-21_18-11-43" src="https://github.com/user-attachments/assets/b1540757-beb4-4a3b-8870-0c91e7eba345" />
<img width="466" height="466" alt="photo_5_2026-09-21_18-11-43" src="https://github.com/user-attachments/assets/0237afe0-2a2a-471d-81ea-54fa64b9d126" />
<img width="466" height="466" alt="photo_4_2026-09-21_18-11-43" src="https://github.com/user-attachments/assets/a7ed0ad5-7361-442f-a33e-8941e6e6ec3a" />



### Features

What it can do:
- display numbers and basic operations using standard mathematical symbols
- display fractions using a linear format [e.g., (x+1) / (y-2)]
- graphically display numeric superscripts and subscripts
- display Greek letters and their corresponding symbols
- display complex operators [e.g., != as ≠, >= as ≥]
- display integrals and square roots

What it cannot do (at the moment):
- display "complex" subscripts and superscripts (such as 1+x); in this case, the app reverts to underscore notation [e.g., 5_(1+x), 3^(x+2)]
- display Greek letters as subscripts or superscripts
- anything else not specified in the "What it can do" section

The app relies on a companion app accessible via the Zepp app on your device.
Currently, the app has only been tested on the AmazFit Active 2. Scaling, resizing, and layout limits are certainly not 100% perfect; any feedback is welcome. At the moment, I am unable to test resizing and — even more importantly — performance on older watches and/or those with rectangular screens.

Any limitations mentioned in this README are primarily due to the limited resources of AmazFit devices and the scarcity of APIs suitable for the app's purpose. While technically feasible, more "complex" visualizations would require rendering a large number of widgets, making the app very slow and difficult to use.

### Disclaimer

This project is intended as a simple experiment for fun. Part of the app's code was generated with the help of Gemini Pro 3.1 and Gemini Flash 3.8.
I haven't yet planned whether or when to release the app on the official store, so for the time being, installation requires basic knowledge of the Zepp APIs.

## Building and Installing

### Prerequisites

* Install Node.js.

* Install the Zepp OS CLI by running: `npm i @zeppos/zeus-cli`

* Enable **Developer Mode** on your phone (open the Zepp app > Profile > Settings > About > tap the Zepp icon 7 times).

### Build Instructions

1. **Clone the repository:**

   ```
   git clone https://github.com/MichelangeloDePascale02/AmazFit-LaTeX-Interpreter.git
   cd AmazFit-LaTeX-Interpreter
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Run the development server:**

   ```
   zeus preview
   ```

4. **Install on your watch:**

   * The terminal will generate and display a QR code.

   * Open the Zepp app on your phone, navigate to Developer Mode, and select **Scan**.

   * Scan the terminal's QR code. The companion app and the watch app will compile and install over Bluetooth directly to your devices.
