const
    success = ['success', 'D/DroidGap', 'D/CordovaLog'],
    error = ['error', 'E/'],
    warning = ['warning', 'W/Web Console'];

module.exports = lines =>
    lines.map(line => ({
        line,
        type: error.some(_ => line.includes(_))
            ? 'error'
            : warning.some(_ => line.includes(_))
                ? 'warning'
                : success.some(_ => line.includes(_))
                    ? 'success'
                    : 'info'
    }))
