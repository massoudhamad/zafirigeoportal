# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################

from django.shortcuts import render
from django.views.generic import TemplateView


class MarineAtlasView(TemplateView):
    """
    ZAFIRI Marine Atlas Homepage View
    Serves the custom Marine Atlas geoportal interface
    """
    template_name = 'marine_atlas/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'ZAFIRI Marine Atlas'
        context['site_name'] = 'Zanzibar Fisheries and Marine Resources Research Institute'
        return context


def marine_atlas_home(request):
    """
    Function-based view for Marine Atlas homepage
    """
    context = {
        'page_title': 'ZAFIRI Marine Atlas',
        'site_name': 'Zanzibar Fisheries and Marine Resources Research Institute',
    }
    return render(request, 'marine_atlas/index.html', context)
