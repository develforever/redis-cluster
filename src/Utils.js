
function escape(str) {
	return (str + '').replace(/\n/ig, "\\n").replace(/\r\n/ig, '\\r\\n');
}

module.exports = {
    escape: escape
};