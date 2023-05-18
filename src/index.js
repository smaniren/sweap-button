import { TextControl, SelectControl, Flex, FlexItem, FlexBlock, PanelBody, PanelRow } from "@wordpress/components"
import { InspectorControls } from "@wordpress/block-editor"

//import "./index.scss"
//Editor sperren, wenn nicht alle Felder befüllt sind
(function () {
    let locked = false
    //funktion, die bei jeder bearbeitung im Editor (egal welches Feld) feuert
    wp.data.subscribe(function () {
        // schaut, ob href link gesetzt wurde
        const results = wp.data.select('core/block-editor').getBlocks().filter(function (block) {
            return block.name == "sweap-button/sweap-button" && block.attributes.link == ""
        })

        if (results.length && locked == false) {
            locked = true
            wp.data.dispatch('core/editor').lockPostSaving('Link nicht hinterlegt')
        }

        if (!results.length && locked) {
            locked = false
            wp.data.dispatch('core/editor').unlockPostSaving('Link nicht hinterlegt')
        }

    })
})()


wp.blocks.registerBlockType("sweap-button/sweap-button", {
    title: "SWEAP-button",
    icon: "button",
    category: "common",
    attributes: {
        text: { type: "string" },
        link: { type: "string" },
        style: { type: "string" },
        icon: { type: "string" }
    },
    edit: EditComponent,
    save: function (props) {
        return null
    }
})

function EditComponent(props) { //components must have uppercase in first character

    function updateBtnText(value) {
        props.setAttributes({ text: value })
    }
    function updateBtnLink(value) {
        props.setAttributes({ link: value })

    }
    function updateBtnStyle(value) {
        props.setAttributes({ style: value })

    }
    function updateBtnIcon(value) {
        props.setAttributes({ icon: value })

    }
    function updateIcon(value) {
        props.setAttributes({ icon: value })

    }
    return (
        <div className="btn">
            <InspectorControls>
                <PanelBody title="Daten">
                    <PanelRow>
                        <TextControl label="Text" value={props.attributes.text} onChange={updateBtnText} />
                    </PanelRow>
                    <PanelRow>
                        <TextControl label="Link" value={props.attributes.link} onChange={updateBtnLink} />
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={('icon')}
                            value={props.attributes.icon} // e.g: value = [ 'a', 'c' ]
                            onChange={updateIcon}
                            options={[
                                { value: 'icon icon--arrow-left', label: 'Pfeil links', disabled: false },
                                { value: 'icon icon--arrow-right', label: 'Pfeil rechts', disabled: false },
                                { value: 'icon icon--phone', label: 'Telefon', disabled: false },
                                { value: 'icon icon--search', label: 'Suche', disabled: false },
                                { value: 'icon icon--send', label: 'Senden', disabled: false },
                                { value: 'icon icon--mail', label: 'Mail', disabled: false }
                            ]}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Stil">
                    <PanelRow>
                        <SelectControl
                            label={('Stil:')}
                            value={props.attributes.style} // e.g: value = [ 'a', 'c' ]
                            onChange={updateBtnStyle}
                            options={[
                                { value: 'wp-element-button', label: 'Default Theme-button', disabled: false },
                                { value: 'btn btn--primary', label: 'primary' },
                                { value: 'btn btn--secondary', label: 'secondary' },
                                { value: 'btn btn--intext', label: 'intext' },
                            ]}
                        />
                    </PanelRow>
                </PanelBody>

            </InspectorControls>
            <FlexBlock>
                <a className={props.attributes.style}>{props.attributes.text} <i className={props.attributes.icon}></i></a>

            </FlexBlock>
        </div >
    )
}