define(function (require, exports, module)
{
    "use strict";
    var commandName1 = "cfshComponent";
    var commandName2 = "cfshQueryObject";
    var commandName3 = "sqlhInsertInto";
    var commandName4 = "sqlhUpdate";
    var Menus = brackets.getModule("command/Menus"),
    CommandManager = brackets.getModule("command/CommandManager"),
    EditorManager = brackets.getModule("editor/EditorManager");

	// Inserts the script for a basic component
    function cfshComponent()
	{
		var myCode = 'component name=""\n';
		myCode = myCode + '{\n';
		myCode = myCode + '\n';
		myCode = myCode + '	function init()\n';
		myCode = myCode + '	{\n';
		myCode = myCode + '		return this;\n';
		myCode = myCode + '	};\n';
		myCode = myCode + '\n';
		myCode = myCode + '}\n';
        var doc = EditorManager.getCurrentFullEditor().document;
        doc.replaceRange(myCode, {line: 0, ch: 0});
    }

	// Inserts the script for a query object
    function cfshQueryObject()
	{
		var myCode = 'var queryObject = new query();\n';
		myCode = myCode + 'queryObject.setDataSource(application.dsn);\n';
		myCode = myCode + 'queryObject.addParam(name="",value=variable,CFSQLTYPE="CF_SQL_INT");\n';
		myCode = myCode + 'queryObject.setSql();\n';
		myCode = myCode + 'var results = queryObject.execute().getResult();\n';
		var editor = EditorManager.getFocusedEditor();
        if (editor)
		{
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(myCode, insertionPos);
        }
    }

	// Inserts the sql statement to insert into a database
    function cfshInsertInto()
	{
		var myCode = "INSERT INTO Table (Column, Column, Column) VALUES (Value, Value, Value)";
		var editor = EditorManager.getFocusedEditor();
        if (editor)
		{
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(myCode, insertionPos);
        }
    }

	// Inserts the sql statement to update a database
    function cfshUpdate()
	{
		var myCode = "UPDATE Table SET Column='Value', Column='Value' WHERE Logic";
		var editor = EditorManager.getFocusedEditor();
        if (editor)
		{
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(myCode, insertionPos);
        }
    }

	// Register the new commands
    CommandManager.register("Component", commandName1, cfshComponent);
    CommandManager.register("Query Object", commandName2, cfshQueryObject);
    CommandManager.register("Insert Into", commandName3, cfshInsertInto);
    CommandManager.register("Update", commandName4, cfshUpdate);

	// Add the cf script commands to a new menu item
    var menuCFS = Menus.addMenu("CFScript", "cfshMenuScript");
    menuCFS.addMenuItem(commandName1);
    menuCFS.addMenuItem(commandName2);
	
	// Add the sql commands to a new menu item
    var menuSQL = Menus.addMenu("SQL", "cfshMenuSQL");
    menuSQL.addMenuItem(commandName3);
    menuSQL.addMenuItem(commandName4);
});