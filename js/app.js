(async () => {
    let opt 
    ["ambiance","chaos","chrome","clouds","clouds_midnight","cobalt","crimson_editor","dawn","dracula","dreamweaver","eclipse","github","gob","gruvbox","idle_fingers","iplastic","katzenmilch","kr_theme","kuroir","merbivore","merbivore_soft","mono_industrial","monokai","nord_dark","one_dark","pastel_on_dark","solarized_dark","solarized_light","sqlserver","terminal","textmate","tomorrow","tomorrow_night","tomorrow_night_blue","tomorrow_night_bright","tomorrow_night_eighties","twilight","vibrant_ink","xcode"].forEach(function(e){
        opt += `<option value="${e}">${e}</option>`
    })
    await import('https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js').catch((error) => console.log('Loading failed' + error))
    const coder = document.querySelector("#coder");
    const html = document.querySelector("#html")
    const css = document.querySelector("#css")
    const js = document.querySelector("#js")
    const btn = document.querySelector(".btn")
    btn.appendChild(Object.assign(document.createElement("select"), {id: "themes", innerHTML: opt}))
    let editor = await ace.edit('html')
    let css_editor = await ace.edit('css')
    let js_editor = await ace.edit('js')
    ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/')
    editor.session.setUseWrapMode(true);
    css_editor.session.setUseWrapMode(true);
    js_editor.session.setUseWrapMode(true);
    editor.setShowPrintMargin(false);
    css_editor.setShowPrintMargin(false);
    js_editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(true);
    css_editor.setHighlightActiveLine(true);
    js_editor.setHighlightActiveLine(true);
    editor.session.setUseSoftTabs(true);
    editor.session.on('change', function(delta) {
      update()
    });
    css_editor.session.on('change', function(delta) {
      update()
    });
    js_editor.session.on('change', function(delta) {
      update()
    });

    editor.setOptions({
        value: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
              
</body>
</html>`,
        theme: 'ace/theme/tomorrow_night',
        mode: 'ace/mode/html',
        enableLiveAutocompletion: true,
        autoScrollEditorIntoView: true,
    })
    css_editor.setOptions({
        value: '/*Write your CSS Here*/',
        theme: 'ace/theme/tomorrow_night',
        mode: 'ace/mode/css',
        enableLiveAutocompletion: true,
        autoScrollEditorIntoView: true,
    })
    js_editor.setOptions({
        value: '//Write your JS Here',
        theme: 'ace/theme/tomorrow_night',
        mode: 'ace/mode/javascript',
        enableLiveAutocompletion: true,
        autoScrollEditorIntoView: true,
    })

    function update(){
      let output = document.querySelector(".output .iframe1").contentWindow.document
      output.write("<style>"+css_editor.getValue()+"</style>" + editor.getValue() + "<script>" + js_editor.getValue() + "</script>")

      output.close()
    }

    themes.addEventListener('change', function(e){
      editor.setOptions({
        theme: 'ace/theme/' + e.target.value
      })
      css_editor.setOptions({
        theme: 'ace/theme/' + e.target.value
      })
      js_editor.setOptions({
        theme: 'ace/theme/' + e.target.value
      })
    })
})()