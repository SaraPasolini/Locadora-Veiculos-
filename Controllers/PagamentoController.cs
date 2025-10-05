using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendaVeiculosApi.Data;
using VendaVeiculosApi.DTOs;
using VendaVeiculosApi.Models;

namespace VendaVeiculosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagamentoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public PagamentoController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet] // Get geral de todos os pagamaentos
    public async Task<ActionResult<IEnumerable<PagamentoDTO>>> Get()
    {
        var list = await _context.Pagamentos.Include(p => p.Aluguel).ToListAsync();
        return Ok(_mapper.Map<List<PagamentoDTO>>(list));
    }

    [HttpPost] // criar pagamento
    public async Task<ActionResult<PagamentoDTO>> Post(PagamentoDTO dto)
    {
        var entity = _mapper.Map<Pagamento>(dto);
        _context.Pagamentos.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, _mapper.Map<PagamentoDTO>(entity));
    }

    // Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _context.Pagamentos.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        _context.Pagamentos.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Atualiza pagamento
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, PagamentoDTO dto)
    {
        if (id != dto.Id) return BadRequest();
        var entity = await _context.Pagamentos.FindAsync(id);
        if (entity == null) return NotFound();
        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
