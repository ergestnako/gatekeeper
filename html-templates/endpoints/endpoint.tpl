{extends designs/site.tpl}

{block title}{$data->Title|escape} &mdash; Endpoints &mdash; {$dwoo.parent}{/block}

{block content}
	{$Endpoint = $data}

	<header class="clearfix">
    	<a class="button pull-right" href="/endpoints/{$Endpoint->Handle}/v{$Endpoint->Version}/edit">Edit Endpoint</a>			
	    <h2>Endpoint: {endpoint $Endpoint}</h2>
	</header>

	<section id="endpoint-docs">
		<h3>Documentation</h3>

		<p class="muted"><em>Not yet implemented. Either <a href="https://github.com/mashery/iodocs">I/O Docs</a> or <a href="https://github.com/wordnik/swagger-ui">Swagger</a> will be integrated in the future to allow JSON-defined documentation to be entered here.</em></p>
	</section>

	<section id="endpoint-cache">
		<h3>Cache Status</h3>

		<p class="muted"><em>Coming soon.</em></p>
	</section>

	<section id="endpoint-log">
		<table>
			<caption>
				<h3>Request Log <small>(Last 30)</small></h3>
			</caption>
			<thead>
				<tr>
					<th class="col-request">Request</th>
					<th class="col-timestamp">Timestamp</th>
					<th class="col-response-code"><small>Response</small> Code</th>
					<th class="col-response-time"><small>Response</small> Time</th>
					<th class="col-response-size"><small>Response</small> Size</th>
					<th class="col-client-ip">Client IP</th>
					<th class="col-key">Key</th>
				</tr>
			</thead>

			<tbody>
			{foreach item=Request from=LoggedRequest::getAllByField('EndpointID', $Endpoint->ID, array(order="ID DESC", limit=30))}
				<tr>
					<td class="col-request">{$Request->Method} <small>{$Request->Path|default:/}{tif $Request->Query ? "?$Request->Query"}</small></td>
					<td class="col-timestamp">{$Request->Created|date_format:'%Y-%m-%d %H:%M:%S'}</td>
					<td class="col-response-code">{$Request->ResponseCode}</td>
					<td class="col-response-time">{$Request->ResponseTime|number_format}&nbsp;ms</td>
					<td class="col-response-size">{$Request->ResponseBytes|number_format}&nbsp;B</td>
					<td class="col-client-ip">{$Request->ClientIP|long2ip}</td>
					<td class="col-key">{if $Request->Key}{apiKey $Request->Key}{else}<small class="muted">&mdash;</small></td>
				</tr>
			{foreachelse}
				<tr>
					<td colspan="7" class="col-empty-text">No requests logged yet.</td>
				</tr>
			{/foreach}
			</tbody>
		</table>
        <a class="button" href="/logs?endpoint={$Endpoint->Handle}">View Full Log</a>
	</section>
{/block}