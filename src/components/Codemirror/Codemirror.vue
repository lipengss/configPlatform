<template>
  <a-textarea ref="textareaRef" id="textArea" v-model:value="textarea"></a-textarea>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue'
const CodeMirror = require('codemirror')
import 'codemirror/theme/3024-night.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/selection/active-line')
require('codemirror/mode/javascript/javascript')
require('codemirror/addon/hint/show-hint')
require('codemirror/keymap/sublime.js')
require('codemirror/addon/selection/active-line.js')
require('codemirror/addon/edit/matchbrackets.js')
require('codemirror/addon/display/autorefresh.js')

export default defineComponent({
  props: {
    dataValue: {
      type: Object,
      default: () => {}
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  setup(props) {
    const textareaRef:any = ref(null)
    let textarea:any = ref(null)
    const options = {
      mode: { name: 'javascript', json: true },
      tabSize: 2,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autoRefresh: true,
      readOnly: true,
      value: [{ key: 'name' }],
      lineWrapping: true,
      scrollbarStyle: null,
      theme: '3024-night',
      extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
      hintOptions: {
        tables: { // 自定义提示选项
          users: ['name', 'score', 'birthDate'],
          countries: ['name', 'population', 'size'],
        },
      }
    }
    onMounted(() => {
      textarea = CodeMirror.fromTextArea(textareaRef.value.$el, options)
      textarea.setSize('auto', props.height)
      textarea.off('change')
      setDataValue()
    })
    watch(() => props.dataValue, (data) => {
      setDataValue()
    }, { deep: true })
    function setDataValue() {
      const strData = JSON.stringify(props.dataValue)
      const jsonData = JSON.stringify(JSON.parse(strData),null,2)
      textarea.setValue(jsonData)
    }
    return {
      textarea,
      textareaRef
    }
  }
})
</script>
