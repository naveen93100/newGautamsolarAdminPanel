
import JoditEditor from 'jodit-react';
import React, { useMemo } from 'react';
import 'jodit/es2021/jodit.min.css';

const JoditEditorCompo = ({ setJoditContent, joditContent }) => {

    const joditConfig = useMemo(() => ({
        readonly: false,
        height: 400,
        resize: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        toolbarAdaptive: false,
        buttons: [
            'bold', 'italic', 'underline', '|',
            'brush', 'eraser', '|',
            'ul', 'ol', '|',
            'table', 'link', 'image', '|',
            'align', '|',
            'paragraph', 'fontsize', '|',
            'undo', 'redo'
        ],
        allowHTML: true,

        defaultActionOnPaste: "insert_clear_html",

        cleanHTML: {
            removeStyles: false,
            fillEmptyParagraph: true,
        },

        events: {
            afterPaste: function () {
                const editorArea = this.editor; // the actual contenteditable DOM node

                const isWhiteOrInvisible = (color) => {
                    if (!color) return false;
                    const c = color.toLowerCase().replace(/\s/g, '');
                    return [
                        'white', '#fff', '#ffffff',
                        'windowtext',
                        'rgb(255,255,255)',
                        'rgba(255,255,255,1)',
                    ].includes(c);
                };

                editorArea.querySelectorAll('*').forEach((el) => {
                    // Remove white inline color
                    if (isWhiteOrInvisible(el.style.color)) {
                        el.style.removeProperty('color');
                    }

                    // Remove white color attribute (old HTML)
                    if (isWhiteOrInvisible(el.getAttribute('color'))) {
                        el.removeAttribute('color');
                    }

                    // Remove Word junk attributes
                    [...el.attributes].forEach(attr => {
                        if (attr.name.startsWith('mso') || attr.name.startsWith('o:')) {
                            el.removeAttribute(attr.name);
                        }
                    });

                    // Unwrap Word auto-generated <a> tags (file://, about:, empty href)

                    if (el.tagName === 'A') {
                        const href = el.getAttribute('href') || '';
                        const isWordAutoLink =
                            href.startsWith('file://') ||
                            href.startsWith('about:') ||
                            href === '' ||
                            href === '#';

                        if (isWordAutoLink) {
                            const parent = el.parentNode;
                            if (parent) {
                                while (el.firstChild) parent.insertBefore(el.firstChild, el);
                                parent.removeChild(el);
                            }
                        }
                    }
                });
            }
        },

        processPasteHTML: function (html) {
            const div = document.createElement("div");
            div.innerHTML = html;

            // Helper: returns true if a color value is white/near-white or invalid
            const isWhiteOrInvisible = (color) => {
                if (!color) return false;
                const c = color.toLowerCase().trim();
                return (
                    c === 'white' ||
                    c === '#fff' ||
                    c === '#ffffff' ||
                    c === 'windowtext' ||         // Word's pseudo-color for "default"
                    c === 'rgb(255, 255, 255)' ||
                    c === 'rgba(255, 255, 255, 1)'
                );
            };

            div.querySelectorAll("*").forEach((el) => {
                const preservedColor = el.style.color;
                const preservedWeight = el.style.fontWeight;
                const preservedStyle = el.style.fontStyle;

                // Strip all formatting
                el.removeAttribute("style");
                el.removeAttribute("class");
                el.removeAttribute("color");
                el.removeAttribute("face");
                el.removeAttribute("bgcolor");

                // Remove Word-specific attributes
                [...el.attributes].forEach(attr => {
                    if (attr.name.startsWith("mso") || attr.name.startsWith("o:")) {
                        el.removeAttribute(attr.name);
                    }
                });

                // Re-apply color ONLY if it's not white/invisible
                if (preservedColor && !isWhiteOrInvisible(preservedColor)) {
                    el.style.color = preservedColor;
                }
                if (preservedWeight) el.style.fontWeight = preservedWeight;
                if (preservedStyle) el.style.fontStyle = preservedStyle;
            });

            // FIX: Unwrap <a> tags from Word — they carry white color & unwanted hrefs
            div.querySelectorAll("a").forEach(a => {
                const href = a.getAttribute("href") || "";
                // Word auto-links company names to their own file path or a real URL
                // Unwrap if it's a local/file path or if the link text matches the href oddly
                const isWordAutoLink =
                    href.startsWith("file://") ||
                    href.startsWith("about:") ||
                    href === "" ||
                    href === "#";

                if (isWordAutoLink) {
                    const parent = a.parentNode;
                    while (a.firstChild) parent.insertBefore(a.firstChild, a);
                    parent.removeChild(a);
                }
            });

            // Unwrap <font> tags
            div.querySelectorAll("font").forEach(font => {
                const parent = font.parentNode;
                while (font.firstChild) parent.insertBefore(font.firstChild, font);
                parent.removeChild(font);
            });

            return div.innerHTML;
        }
    }), []);

    return (
        <div>
            <JoditEditor
                value={joditContent}
                config={joditConfig}
                onBlur={(content) => setJoditContent(content)}
            />
        </div>
    );
};

export default React.memo(JoditEditorCompo);