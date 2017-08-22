const
    success = ['success', 'D/DroidGap', 'D/CordovaLog'],
    error = ['error', 'E/'],
    warning = ['warning', 'W/Web Console'];

module.exports = function (lines) {
    return lines.map(function (line) {
        return has(line, error)
            ? {line: line, type: 'error'}
            : has(line, warning)
                ? {line: line, type: 'warning'}
                : has(line, success)
                    ? {line: line, type: 'success'}
                    : {line: line, type: 'info'};
    });
};
