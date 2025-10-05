using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendaVeiculosApi.Data;
using VendaVeiculosApi.DTOs;
using VendaVeiculosApi.Models;

namespace VendaVeiculosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ClienteController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet] // Get geral 
    public async Task<ActionResult<IEnumerable<ClienteDTO>>> Get()
    {
        var list = await _context.Clientes.ToListAsync();
        return Ok(_mapper.Map<List<ClienteDTO>>(list));
    }

    [HttpGet("{id}")] // Get por id
    public async Task<ActionResult<ClienteDTO>> Get(int id)
    {
        var item = await _context.Clientes.FindAsync(id);
        if (item == null) return NotFound();
        return Ok(_mapper.Map<ClienteDTO>(item));
    }

    // Get por CPF
    [HttpGet("by-cpf/{cpf}")]
    public async Task<ActionResult<ClienteDTO>> GetByCpf(string cpf)
    {
        var item = await _context.Clientes.FirstOrDefaultAsync(c => c.CPF == cpf);
        if (item == null) return NotFound();
        return Ok(_mapper.Map<ClienteDTO>(item));
    }

    [HttpPost] // criar cliente
    public async Task<ActionResult<ClienteDTO>> Post(ClienteDTO dto)
    {
        var entity = _mapper.Map<Cliente>(dto);
        _context.Clientes.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, _mapper.Map<ClienteDTO>(entity));
    }

    [HttpPut("{id}")] // atualiza pegando o ID
    public async Task<IActionResult> Put(int id, ClienteDTO dto)
    {
        if (id != dto.Id) return BadRequest();
        var entity = await _context.Clientes.FindAsync(id);
        if (entity == null) return NotFound();
        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _context.Clientes.FindAsync(id);
        if (entity == null) return NotFound();
        _context.Clientes.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
