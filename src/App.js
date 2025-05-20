import React, { useState, useEffect, useRef, useCallback } from 'react';

const FONT_MAP = {
  ' ': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  'A': [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
  'B': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0]],
  'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1]],
  'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'F': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'G': [[0,1,1,1,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[0,1,1,1,1]],
  'H': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
  'I': [[0,1,1,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
  'J': [[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'K': [[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0]],
  'L': [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'M': [[1,1,0,1,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
  'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'P': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
  'Q': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1]],
  'R': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,1,0],[1,0,0,0,1]],
  'S': [[0,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
  'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'V': [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]],
  'W': [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],
  'X': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
  'Y': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'Z': [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
  '0': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '1': [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
  '2': [[0,1,1,1,0],[1,0,0,0,1],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
  '3': [[1,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,1]],
  '4': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1]],
  '5': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
  '6': [[0,1,1,1,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
  '7': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0]],
  '8': [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
  '9': [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],
  '.': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0]],
  '!': [[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]],
  '?': [[0,1,1,1,0],[1,0,0,0,1],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]],
  '-': [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],
  '+': [[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]],
  '=': [[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0]],
  '/': [[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0]],
  '\\': [[1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1]],
  '*': [[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  '@': [[0,1,1,1,0],[1,0,0,0,1],[1,0,1,1,0],[1,0,0,0,0],[0,1,1,1,0]],
  ':': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  ';': [[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0]],
  '_': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]],
};

const LED_COLS_PER_CHAR = 5;
const CHARS_PER_SECTION = 3;

const SECTION_LED_WIDTH = (LED_COLS_PER_CHAR * CHARS_PER_SECTION);
const SECTION_LED_HEIGHT = 5;
const TOTAL_SECTIONS = 3;
const GAP_BETWEEN_SECTIONS_PX = 25;

const PHONE_COLORS = {
  black: 'bg-gray-900',
  blue: 'bg-blue-600',
  orange: 'bg-orange-500',
  pink: 'bg-pink-600',
  green: 'bg-green-600',
};

const INACTIVE_LED_COLORS = {
  black: 'bg-gray-800',
  blue: 'bg-blue-800',
  orange: 'bg-orange-700',
  pink: 'bg-pink-800',
  green: 'bg-green-800',
};

const LEDPixel = ({ isLit, animate, delay, isCustomMode, onClick, phoneColor, isEditModeActive, mode }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (animate) {
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setVisible(isLit);
      }, delay);
    } else {
      setVisible(isLit);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isLit, animate, delay]);

  const handleClick = () => {
    if (isCustomMode && isEditModeActive && onClick) {
      onClick();
    }
  };

  let inactiveColorClass;
  if (mode === 'text') {
    inactiveColorClass = INACTIVE_LED_COLORS[phoneColor] || 'bg-gray-950';
  } else if (mode === 'custom') {
    if (isEditModeActive) {
      inactiveColorClass = phoneColor === 'black' ? 'bg-gray-800' : 'bg-gray-950';
    } else {
      inactiveColorClass = INACTIVE_LED_COLORS[phoneColor] || 'bg-gray-950';
    }
  } else {
    inactiveColorClass = 'bg-gray-950';
  }

  return (
    <div
      className={`w-full h-full aspect-square transition-opacity duration-300 ${
        visible ? 'bg-white' : inactiveColorClass
      } ${isCustomMode && isEditModeActive ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    ></div>
  );
};

const LEDSectionDisplay = ({ textPart, customSectionPattern, mode, onToggleLed, sectionIndex, phoneColor, isEditModeActive }) => {
  const [animationTrigger, setAnimationTrigger] = useState(0);

  useEffect(() => {
    if (mode === 'text') {
      setAnimationTrigger(prev => prev + 1);
    }
  }, [textPart, mode]);

  const getSectionPattern = useCallback(() => {
    if (mode === 'custom') {
      return customSectionPattern;
    }

    const sectionPattern = Array(SECTION_LED_HEIGHT).fill(0).map(() => Array(SECTION_LED_WIDTH).fill(0));
    const normalizedTextPart = textPart.toUpperCase().padEnd(CHARS_PER_SECTION, ' ');

    for (let charIndex = 0; charIndex < normalizedTextPart.length; charIndex++) {
      const char = normalizedTextPart[charIndex];
      const charPattern = FONT_MAP[char] || FONT_MAP[' '];

      const startCol = charIndex * LED_COLS_PER_CHAR;

      for (let row = 0; row < SECTION_LED_HEIGHT; row++) {
        for (let col = 0; col < LED_COLS_PER_CHAR; col++) {
          if (charPattern[row] && charPattern[row][col] !== undefined) {
            sectionPattern[row][startCol + col] = charPattern[row][col];
          }
        }
      }
    }
    return sectionPattern;
  }, [textPart, customSectionPattern, mode]);

  const currentSectionPattern = getSectionPattern();

  return (
    <div
      className={`grid gap-1`}
      style={{
        gridTemplateColumns: `repeat(${SECTION_LED_WIDTH}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${SECTION_LED_HEIGHT}, minmax(0, 1fr))`,
        width: '100%',
        height: 'auto',
        aspectRatio: `${SECTION_LED_WIDTH}/${SECTION_LED_HEIGHT}`,
      }}
    >
      {currentSectionPattern.flat().map((pixelState, index) => {
        const row = Math.floor(index / SECTION_LED_WIDTH);
        const col = index % SECTION_LED_WIDTH;

        const totalPixelIndex = (sectionIndex * SECTION_LED_WIDTH * SECTION_LED_HEIGHT) + index;
        const delay = totalPixelIndex * 5;

        return (
          <LEDPixel
            key={`${index}-${animationTrigger}`}
            isLit={pixelState === 1}
            animate={true}
            delay={delay}
            isCustomMode={mode === 'custom'}
            onClick={() => onToggleLed(row, col, sectionIndex)}
            phoneColor={phoneColor}
            isEditModeActive={isEditModeActive}
            mode={mode}
          />
        );
      })}
    </div>
  );
};

const SettingsMenu = ({
  isOpen,
  onClose,
  phoneColor,
  setPhoneColor,
  mode,
  setMode,
  savePreference,
  setSavePreference,
  askSavePreference,
  setAskSavePreference,
  defaultLaunchColor,
  setDefaultLaunchColor,
  defaultLaunchMode,
  setDefaultLaunchMode,
  loadPreference,
  setLoadPreference,
  askLoadPreference,
  setAskLoadPreference,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative flex flex-col" style={{ maxHeight: '90vh' }}>
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-800 pb-4 z-10">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            className="text-gray-400 hover:text-white text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto flex-grow pr-2">
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">Display Mode:</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  mode === 'text' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setMode('text')}
              >
                Letters
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  mode === 'custom' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setMode('custom')}
              >
                Custom LEDs
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">Phone Color:</label>
            <div className="flex space-x-2">
              {Object.keys(PHONE_COLORS).map((colorKey) => (
                <button
                  key={colorKey}
                  className={`w-8 h-8 rounded-full border-2 ${
                    phoneColor === colorKey ? 'border-white' : 'border-transparent'
                  } ${PHONE_COLORS[colorKey]}`}
                  onClick={() => setPhoneColor(colorKey)}
                  title={colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
                ></button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">Default Save Type:</label>
            <select
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={savePreference}
              onChange={(e) => setSavePreference(e.target.value)}
            >
              <option value="none">Ask Every Time</option>
              <option value="json">JSON File</option>
              <option value="localstorage">Browser Storage</option>
            </select>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="askSavePreference"
                className="form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                checked={!askSavePreference}
                onChange={() => setAskSavePreference(!askSavePreference)}
              />
              <label htmlFor="askSavePreference" className="ml-2 text-gray-400 text-sm">
                Don't ask every time (use default above)
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">Default Load Type:</label>
            <select
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={loadPreference}
              onChange={(e) => setLoadPreference(e.target.value)}
            >
              <option value="none">Ask Every Time</option>
              <option value="json">JSON File</option>
              <option value="localstorage">Browser Storage</option>
            </select>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="askLoadPreference"
                className="form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                checked={!askLoadPreference}
                onChange={() => setAskLoadPreference(!askLoadPreference)}
              />
              <label htmlFor="askLoadPreference" className="ml-2 text-gray-400 text-sm">
                Don't ask every time (use default above)
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Launch Options:</h3>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">Default Launch Color:</label>
              <select
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={defaultLaunchColor}
                onChange={(e) => setDefaultLaunchColor(e.target.value)}
              >
                {Object.keys(PHONE_COLORS).map((colorKey) => (
                  <option key={colorKey} value={colorKey}>
                    {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Default Launch Mode:</label>
              <select
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={defaultLaunchMode}
                onChange={(e) => setDefaultLaunchMode(e.target.value)}
              >
                <option value="text">Letters</option>
                <option value="custom">Custom LEDs</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [customLedPattern, setCustomLedPattern] = useState(() =>
    Array(TOTAL_SECTIONS).fill(0).map(() =>
      Array(SECTION_LED_HEIGHT).fill(0).map(() =>
        Array(SECTION_LED_WIDTH).fill(0)
      )
    )
  );
  const [mode, setMode] = useState('text');
  const [phoneColor, setPhoneColor] = useState('black');
  const [showSettings, setShowSettings] = useState(false);
  const [savePreference, setSavePreference] = useState('none');
  const [askSavePreference, setAskSavePreference] = useState(true);
  const [loadPreference, setLoadPreference] = useState('none');
  const [askLoadPreference, setAskLoadPreference] = useState(true);
  const [defaultLaunchColor, setDefaultLaunchColor] = useState('black');
  const [defaultLaunchMode, setDefaultLaunchMode] = useState('text');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showLoadConfirm, setShowLoadConfirm] = useState(false);
  const savePayloadRef = useRef(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingPattern, setIsGeneratingPattern] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const savedSettings = JSON.parse(localStorage.getItem('noriLedComposerSettings'));
      if (savedSettings) {
        setSavePreference(savedSettings.savePreference || 'none');
        setAskSavePreference(savedSettings.askSavePreference !== false);
        setLoadPreference(savedSettings.loadPreference || 'none');
        setAskLoadPreference(savedSettings.askLoadPreference !== false);
        setDefaultLaunchColor(savedSettings.defaultLaunchColor || 'black');
        setDefaultLaunchMode(savedSettings.defaultLaunchMode || 'text');
        setPhoneColor(savedSettings.defaultLaunchColor || 'black');
        setMode(savedSettings.defaultLaunchMode || 'text');
      }

      const savedData = JSON.parse(localStorage.getItem('noriLedComposerData'));
      if (savedData) {
        if (savedData.mode === 'text' && savedData.inputText) {
          setInputText(savedData.inputText);
        } else if (savedData.mode === 'custom' && savedData.customLedPattern) {
          if (Array.isArray(savedData.customLedPattern) && savedData.customLedPattern.length === TOTAL_SECTIONS &&
              savedData.customLedPattern.every(section => Array.isArray(section) && section.length === SECTION_LED_HEIGHT &&
              section.every(row => Array.isArray(row) && row.length === SECTION_LED_WIDTH))) {
            setCustomLedPattern(savedData.customLedPattern);
          } else {
            console.warn("Loaded custom LED pattern has an unexpected structure. Resetting to empty.");
            setCustomLedPattern(Array(TOTAL_SECTIONS).fill(0).map(() =>
              Array(SECTION_LED_HEIGHT).fill(0).map(() =>
                Array(SECTION_LED_WIDTH).fill(0)
              )
            ));
          }
        }
      }
    } catch (error) {
      console.error("Failed to load settings or data from localStorage:", error);
      localStorage.removeItem('noriLedComposerSettings');
      localStorage.removeItem('noriLedComposerData');
    }
  }, []);

  useEffect(() => {
    try {
      const settingsToSave = {
        savePreference,
        askSavePreference,
        loadPreference,
        askLoadPreference,
        defaultLaunchColor,
        defaultLaunchMode,
      };
      localStorage.setItem('noriLedComposerSettings', JSON.stringify(settingsToSave));
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
    }
  }, [savePreference, askSavePreference, loadPreference, askLoadPreference, defaultLaunchColor, defaultLaunchMode]);

  const saveToLocalStorage = useCallback(() => {
    try {
      const dataToSave = {
        mode,
        inputText: mode === 'text' ? inputText : undefined,
        customLedPattern: mode === 'custom' ? customLedPattern : undefined,
      };
      localStorage.setItem('noriLedComposerData', JSON.stringify(dataToSave));
      console.log('Data saved to browser storage!');
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }, [mode, inputText, customLedPattern]);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem('noriLedComposerData'));
      if (savedData) {
        setMode(savedData.mode || 'text');
        if (savedData.mode === 'text' && savedData.inputText !== undefined) {
          setInputText(savedData.inputText);
        } else if (savedData.mode === 'custom' && savedData.customLedPattern) {
           if (Array.isArray(savedData.customLedPattern) && savedData.customLedPattern.length === TOTAL_SECTIONS &&
              savedData.customLedPattern.every(section => Array.isArray(section) && section.length === SECTION_LED_HEIGHT &&
              section.every(row => Array.isArray(row) && row.length === SECTION_LED_WIDTH))) {
              setCustomLedPattern(savedData.customLedPattern);
            } else {
              console.warn("Loaded custom LED pattern from local storage has an unexpected structure. Resetting to empty.");
              setCustomLedPattern(Array(TOTAL_SECTIONS).fill(0).map(() =>
                Array(SECTION_LED_HEIGHT).fill(0).map(() =>
                  Array(SECTION_LED_WIDTH).fill(0)
                )
              ));
            }
        }
        console.log('Data loaded from browser storage!');
      } else {
        console.log('No saved data found in browser storage.');
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, []);

  const saveAsJsonFile = useCallback(() => {
    try {
      const dataToSave = {
        mode,
        inputText: mode === 'text' ? inputText : undefined,
        customLedPattern: mode === 'custom' ? customLedPattern : undefined,
      };
      const jsonString = JSON.stringify(dataToSave, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nori_led_data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Data saved as JSON file!');
    } catch (error) {
      console.error("Error saving as JSON file:", error);
    }
  }, [mode, inputText, customLedPattern]);

  const loadFromJsonFile = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedData = JSON.parse(e.target.result);
        setMode(loadedData.mode || 'text');
        if (loadedData.mode === 'text' && loadedData.inputText !== undefined) {
          setInputText(loadedData.inputText);
        } else if (loadedData.mode === 'custom' && loadedData.customLedPattern) {
          if (Array.isArray(loadedData.customLedPattern) && loadedData.customLedPattern.length === TOTAL_SECTIONS &&
              loadedData.customLedPattern.every(section => Array.isArray(section) && section.length === SECTION_LED_HEIGHT &&
              section.every(row => Array.isArray(row) && row.length === SECTION_LED_WIDTH))) {
            setCustomLedPattern(savedData.customLedPattern);
          } else {
            console.warn("Loaded custom LED pattern from file has an unexpected structure. Resetting to empty.");
            setCustomLedPattern(Array(TOTAL_SECTIONS).fill(0).map(() =>
              Array(SECTION_LED_HEIGHT).fill(0).map(() =>
                Array(SECTION_LED_WIDTH).fill(0)
              )
            ));
          }
        }
        console.log('Data loaded from JSON file!');
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleSave = useCallback(() => {
    if (askSavePreference) {
      savePayloadRef.current = { mode, inputText, customLedPattern };
      setShowSaveConfirm(true);
    } else {
      if (savePreference === 'json') {
        saveAsJsonFile();
      } else if (savePreference === 'localstorage') {
        saveToLocalStorage();
      } else {
        savePayloadRef.current = { mode, inputText, customLedPattern };
        setShowSaveConfirm(true);
      }
    }
  }, [askSavePreference, savePreference, saveAsJsonFile, saveToLocalStorage, mode, inputText, customLedPattern]);

  const handleSaveConfirm = (type) => {
    if (type === 'json') {
      saveAsJsonFile();
    } else if (type === 'localstorage') {
      saveToLocalStorage();
    }
    setShowSaveConfirm(false);
    savePayloadRef.current = null;
  };

  const handleLoad = useCallback(() => {
    if (askLoadPreference) {
      setShowLoadConfirm(true);
    } else {
      if (loadPreference === 'json') {
        document.getElementById('json-file-input').click();
      } else if (loadPreference === 'localstorage') {
        loadFromLocalStorage();
      } else {
        setShowLoadConfirm(true);
      }
    }
  }, [askLoadPreference, loadPreference, loadFromLocalStorage]);

  const handleLoadConfirm = (type) => {
    if (type === 'json') {
      document.getElementById('json-file-input').click();
    } else if (type === 'localstorage') {
      loadFromLocalStorage();
    }
    setShowLoadConfirm(false);
  };

  const handleToggleLed = useCallback((row, col, sectionIndex) => {
    setCustomLedPattern(prevPattern => {
      const newPattern = prevPattern.map(s => s.map(r => [...r]));
      newPattern[sectionIndex][row][col] = newPattern[sectionIndex][row][col] === 1 ? 0 : 1;
      return newPattern;
    });
  }, []);

  const MAX_CHARS = CHARS_PER_SECTION * TOTAL_SECTIONS;

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    try {
      let chatHistory = [];
      const prompt = `Generate a single word or a very short phrase (maximum 9 characters) that would look good on an old-style LED display. The characters should be simple and clear. Only return the word/phrase, no other text.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(payload)
             });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        let generatedText = result.candidates[0].content.parts[0].text;
        generatedText = generatedText.replace(/[^a-zA-Z0-9]/g, '').substring(0, MAX_CHARS).toUpperCase();
        setInputText(generatedText);
      } else {
        console.error("LLM text generation failed:", result);
        setInputText("ERROR");
      }
    } catch (error) {
      console.error("Error calling LLM for text generation:", error);
      setInputText("ERROR");
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generatePatternWithLLM = async () => {
    setIsGeneratingPattern(true);
    try {
      let chatHistory = [];
      const prompt = `Generate a 3D array representing a 15x5 binary LED pattern for each of 3 sections. Each section should be a 5x15 2D array of 0s and 1s. 0 means off, 1 means on. The pattern should be abstract or a simple recognizable shape that fits within the 15x5 dimensions. Do not include any text, only the JSON array.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = {
          contents: chatHistory,
          generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: "ARRAY",
                  items: {
                      type: "ARRAY",
                      items: {
                          type: "ARRAY",
                          items: { "type": "INTEGER" },
                          minItems: SECTION_LED_WIDTH,
                          maxItems: SECTION_LED_WIDTH
                      },
                      minItems: SECTION_LED_HEIGHT,
                      maxItems: SECTION_LED_HEIGHT
                  },
                  minItems: TOTAL_SECTIONS,
                  maxItems: TOTAL_SECTIONS
              }
          }
      };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(payload)
             });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const jsonString = result.candidates[0].content.parts[0].text;
        const generatedPattern = JSON.parse(jsonString);

        if (Array.isArray(generatedPattern) && generatedPattern.length === TOTAL_SECTIONS &&
            generatedPattern.every(section => Array.isArray(section) && section.length === SECTION_LED_HEIGHT &&
            section.every(row => Array.isArray(row) && row.length === SECTION_LED_WIDTH &&
            row.every(pixel => pixel === 0 || pixel === 1)))) {
          setCustomLedPattern(generatedPattern);
        } else {
          console.error("LLM generated pattern has an invalid structure:", generatedPattern);
          setCustomLedPattern(Array(TOTAL_SECTIONS).fill(0).map(() =>
            Array(SECTION_LED_HEIGHT).fill(0).map(() =>
              Array(SECTION_LED_WIDTH).fill(0)
            )
          ));
        }
      } else {
        console.error("LLM pattern generation failed:", result);
        setCustomLedPattern(Array(TOTAL_SECTIONS).fill(0).map(() =>
          Array(SECTION_LED_HEIGHT).fill(0).map(() =>
            Array(SECTION_LED_WIDTH).fill(0)
          )
        ));
      }
    } catch (error) {
      console.error("Error calling LLM for pattern generation:", error);
      setCustomLedPattern(Array(TOTAL_SECTIONS).fill(0).map(() =>
        Array(SECTION_LED_HEIGHT).fill(0).map(() =>
          Array(SECTION_LED_WIDTH).fill(0)
        )
      ));
    } finally {
      setIsGeneratingPattern(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center font-sans ${PHONE_COLORS[phoneColor]} overflow-y-auto overflow-x-hidden`}>
      <div className={`fixed top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-40 ${PHONE_COLORS[phoneColor]} bg-opacity-90`}>
        <button
          className="text-white text-3xl p-2 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center"
          onClick={() => setShowSettings(true)}
          aria-label="Open settings menu"
        >
          &#9776;
          <span className="ml-2 text-base hidden sm:inline">Settings</span>
        </button>

        <div className="flex items-center space-x-4">
          {mode === 'custom' && (
            <button
              className="text-white text-sm p-2 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center"
              onClick={() => setIsEditModeActive(prev => !prev)}
              aria-label="Toggle inactive LED color"
            >
              <span className="mr-2">
                {isEditModeActive ? 'Edit Mode' : 'Preview Mode'}:
              </span>
              <span className={`w-4 h-4 rounded-full border border-white ${isEditModeActive ? (phoneColor === 'black' ? 'bg-gray-800' : 'bg-gray-950') : (INACTIVE_LED_COLORS[phoneColor] || 'bg-gray-950')}`}></span>
            </button>
          )}
          <h1 className="text-base font-extrabold text-white text-right tracking-wide sm:text-lg md:text-xl lg:text-2xl">
            Samsung Nori LED Composer Online
          </h1>
        </div>
      </div>

      <div className={`flex ${isLandscape ? 'flex-row' : 'flex-col'} items-center justify-center w-full flex-grow pt-20 pb-4 px-4 max-w-screen-xl mx-auto`}>
        <div className={`${isLandscape ? 'w-1/2 pr-4' : 'w-full mb-8'} flex flex-col items-center justify-center max-w-full`}>
          {mode === 'text' && (
            <div className="w-full">
              <textarea
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white resize-none font-mono text-lg placeholder-gray-400"
                placeholder="Enter up to 9 characters..."
                maxLength={CHARS_PER_SECTION * TOTAL_SECTIONS}
                rows="3"
                value={inputText}
                onChange={(e) => setInputText(e.target.value.toUpperCase())}
              ></textarea>
              <p className="text-sm text-gray-400 mt-2 text-right">
                {inputText.length}/{CHARS_PER_SECTION * TOTAL_SECTIONS} characters
              </p>
              <button
                className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 font-bold text-lg w-full"
                onClick={generateTextWithLLM}
                disabled={isGeneratingText}
              >
                {isGeneratingText ? 'Generating...' : 'Surprise me'}
              </button>
            </div>
          )}

          {mode === 'custom' && (
            <button
              className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 font-bold text-lg w-full max-w-xs"
              onClick={generatePatternWithLLM}
              disabled={isGeneratingPattern}
            >
              {isGeneratingPattern ? 'Generating...' : 'Surprise me'}
            </button>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 font-bold text-lg"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 font-bold text-lg"
              onClick={handleLoad}
            >
              Load
            </button>
            <input type="file" id="json-file-input" accept=".json" className="hidden" onChange={loadFromJsonFile} />
          </div>
        </div>

        <div className={`flex flex-col space-y-[${GAP_BETWEEN_SECTIONS_PX}px] items-center max-w-full
          ${isLandscape
            ? 'w-1/2 p-3 rounded-lg border-2 border-gray-700 shadow-inner flex-grow ' + (PHONE_COLORS[phoneColor] === 'bg-gray-900' ? 'bg-black' : PHONE_COLORS[phoneColor])
            : 'w-full mt-8 px-0 bg-transparent rounded-none border-none shadow-none'
          }
        `}>
          {Array.from({ length: TOTAL_SECTIONS }).map((_, sectionIndex) => (
            <LEDSectionDisplay
              key={sectionIndex}
              textPart={inputText.substring(sectionIndex * CHARS_PER_SECTION, (sectionIndex + 1) * CHARS_PER_SECTION)}
              customSectionPattern={customLedPattern[sectionIndex]}
              mode={mode}
              onToggleLed={(row, col) => handleToggleLed(row, col, sectionIndex)}
              sectionIndex={sectionIndex}
              phoneColor={phoneColor}
              isEditModeActive={isEditModeActive}
            />
          ))}
        </div>
      </div>

      <SettingsMenu
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        phoneColor={phoneColor}
        setPhoneColor={setPhoneColor}
        mode={mode}
        setMode={setMode}
        savePreference={savePreference}
        setSavePreference={setSavePreference}
        askSavePreference={askSavePreference}
        setAskSavePreference={setAskSavePreference}
        loadPreference={loadPreference}
        setLoadPreference={setLoadPreference}
        askLoadPreference={askLoadPreference}
        setAskLoadPreference={setAskLoadPreference}
        defaultLaunchColor={defaultLaunchColor}
        setDefaultLaunchColor={setDefaultLaunchColor}
        defaultLaunchMode={defaultLaunchMode}
        setDefaultLaunchMode={setDefaultLaunchMode}
      />

      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative text-center">
            <h2 className="text-xl font-bold text-white mb-4">Choose Save Type</h2>
            <p className="text-gray-300 mb-6">How would you like to save your data?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                onClick={() => handleSaveConfirm('json')}
              >
                JSON File
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                onClick={() => handleSaveConfirm('localstorage')}
              >
                Browser Storage
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <input
                type="checkbox"
                id="doNotAskAgainSave"
                className="form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                checked={!askSavePreference}
                onChange={() => setAskSavePreference(!askSavePreference)}
              />
              <label htmlFor="doNotAskAgainSave" className="ml-2 text-gray-400 text-sm">
                Don't ask again
              </label>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl"
              onClick={() => setShowSaveConfirm(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showLoadConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative text-center">
            <h2 className="text-xl font-bold text-white mb-4">Choose Load Type</h2>
            <p className="text-gray-300 mb-6">How would you like to load your data?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                onClick={() => handleLoadConfirm('json')}
              >
                JSON File
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                onClick={() => handleLoadConfirm('localstorage')}
              >
                Browser Storage
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <input
                type="checkbox"
                id="doNotAskAgainLoad"
                className="form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                checked={!askLoadPreference}
                onChange={() => setAskLoadPreference(!askLoadPreference)}
              />
              <label htmlFor="doNotAskAgainLoad" className="ml-2 text-gray-400 text-sm">
                Don't ask again
              </label>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl"
              onClick={() => setShowLoadConfirm(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
