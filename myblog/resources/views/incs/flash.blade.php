@if ($message = Session::get('success'))
            <div class="alert alert-success alert-block" id="alerte">
                    <button type="button" class="close" onclick="document.getElementById('alerte').style.display='none'" data-dismiss="alert">X</button>
                    <strong>{{ $message }}</strong>
            </div>
@endif

@if ($message = Session::get('warning'))
            <div class="alert alert-warning alert-block" id="warning">
                    <button type="button" class="close" onclick="document.getElementById('warning').style.display='none'" data-dismiss="alert">X</button>
                    <strong>{{ $message }}</strong>
            </div>
@endif
