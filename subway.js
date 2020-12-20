var cache = {'url':''};

function random(range)
{
	return Math.floor(Math.random()*range);
}

function pick()
{
	var data = cache.data;

	var id = random(data.stations.length);
	var station = data.stations[id];
	var name = Object.keys(station)[0];

	var lines = station[name];
	var line = lines[random(lines.length)];

	output.innerHTML = 'Line: '+line+'<br>Name: '+name;
}

function parseJSON(text)
{
	var data = JSON.parse(text);
	cache.data = data;

	pick();
}

function request(url, callback)
{
	var xhr = new XMLHttpRequest();

	xhr.onload = function()
	{
		console.log('"'+url+'" loaded')
		cache.url = url;
		callback(xhr.response);
	}

	xhr.open('GET', url);
	xhr.send();
}

function run(url)
{
	if(cache.url != url)
	{
		request(url, parseJSON);
	}
	else
	{
		pick();
	}
}